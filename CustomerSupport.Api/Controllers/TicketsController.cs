
using CustomerSupport.Api.Contracts.Tickets;
using CustomerSupport.Domai.Entities;
using CustomerSupport.Domai.Enums;
using CustomerSuport.Infrastructuree;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CustomerSupport.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public TicketsController(ApplicationDbContext db)
        {
            _db = db;
        }

        // -----------------------------
        // POST: /api/tickets
        // -----------------------------
        [HttpPost]
        public async Task<ActionResult<TicketResponse>> Create(
            [FromBody] CreateTicketRequest request)
        {
            if (request is null)
                return BadRequest("Request body is required.");

            if (string.IsNullOrWhiteSpace(request.Title))
                return BadRequest("Title is required.");

            if (string.IsNullOrWhiteSpace(request.Description))
                return BadRequest("Description is required.");

            if (!Enum.TryParse<TicketPriority>(
                    request.Priority,
                    ignoreCase: true,
                    out var priority))
            {
                return BadRequest(
                    "Invalid priority. Allowed: Low, Medium, High, Critical.");
            }

            var ticket = Ticket.Create(
                title: request.Title,
                description: request.Description,
                categoryId: request.CategoryId, // int
                priority: priority,
                createdByUserId: request.CreatedByUserId
            );

            await _db.Tickets.AddAsync(ticket);
            await _db.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetById),
                new { id = ticket.Id },
                ToResponse(ticket));
        }

        // -----------------------------
        // GET: /api/tickets/{id}
        // -----------------------------
        [HttpGet("{id:guid}")]
        public async Task<ActionResult<TicketResponse>> GetById(Guid id)
        {
            var ticket = await _db.Tickets
                                  .AsNoTracking()
                                  .FirstOrDefaultAsync(t => t.Id == id);

            if (ticket is null)
                return NotFound();

            return Ok(ToResponse(ticket));
        }

        // -----------------------------
        // PUT: /api/tickets/{id}/status
        // -----------------------------
        [HttpPut("{id:guid}/status")]
        public async Task<ActionResult<TicketResponse>> UpdateStatus(
            Guid id,
            [FromBody] UpdateTicketStatusRequest request)
        {
            if (request is null)
                return BadRequest("Request body is required.");

            if (!Enum.TryParse<TicketStatus>(
                    request.ToStatus,
                    ignoreCase: true,
                    out var toStatus))
            {
                return BadRequest(
                    "Invalid status. Allowed: New, Open, InProgress, OnHold, Resolved, Closed.");
            }

            var ticket = await _db.Tickets.FirstOrDefaultAsync(t => t.Id == id);
            if (ticket is null)
                return NotFound();

            var fromStatus = ticket.Status;

            try
            {
                ticket.TransitionTo(toStatus);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }

            var history = TicketStatusHistory.Create(
                ticketId: ticket.Id,
                fromStatus: fromStatus,
                toStatus: toStatus,
                changedByUserId: request.ChangedByUserId,
                reason: request.Reason
            );

            _db.TicketStatusHistory.Add(history);
            await _db.SaveChangesAsync();

            return Ok(ToResponse(ticket));
        }

        // -----------------------------
        // GET: /api/tickets/{id}/history
        // -----------------------------
        [HttpGet("{id:guid}/history")]
        public async Task<ActionResult<object>> GetHistory(Guid id)
        {
            var exists = await _db.Tickets
                                  .AsNoTracking()
                                  .AnyAsync(t => t.Id == id);

            if (!exists)
                return NotFound();

            var history = await _db.TicketStatusHistory
                                   .AsNoTracking()
                                   .Where(h => h.TicketId == id)
                                   .OrderBy(h => h.ChangedAtUtc)
                                   .Select(h => new
                                   {
                                       h.Id,
                                       h.TicketId,
                                       FromStatus = h.FromStatus.ToString(),
                                       ToStatus = h.ToStatus.ToString(),
                                       h.ChangedByUserId,
                                       h.ChangedAtUtc,
                                       h.Reason
                                   })
                                   .ToListAsync();

            return Ok(history);
        }

        // -----------------------------
        // Mapping
        // -----------------------------
        private static TicketResponse ToResponse(Ticket ticket)
        {
            return new TicketResponse
            {
                Id = ticket.Id,
                Title = ticket.Title,
                Description = ticket.Description,
                Status = ticket.Status.ToString(),
                Priority = ticket.Priority.ToString(),
                CategoryId = ticket.CategoryId,           // int
                CreatedByUserId = ticket.CreatedByUserId,
                AssignedToUserId = ticket.AssignedToUserId,
                CreatedAtUtc = ticket.CreatedAtUtc,
                UpdatedAtUtc = ticket.UpdatedAtUtc
            };
        }
    }
}

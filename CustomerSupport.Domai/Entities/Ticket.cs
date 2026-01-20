using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using CustomerSupport.Domai.Enums;

namespace CustomerSupport.Domai.Entities
{
    public class Ticket
    {
        public Guid Id { get; private set; }


        public string Title { get; private set; } = null!;
        public string Description { get; private set; } = null!;

        public TicketStatus Status { get; private set; }
        public TicketPriority Priority { get; private set; }

        public int CategoryId { get; private set; }

        public Guid CreatedByUserId { get; private set; }
        public Guid? AssignedToUserId { get; private set; }

        public DateTime CreatedAtUtc { get; private set; }
        public DateTime? UpdatedAtUtc { get; private set; }

        private Ticket() { } // For EF Core

        public static Ticket Create(
            string title,
            string description,
            int categoryId,
            TicketPriority priority,
            Guid createdByUserId)
        {
            if (string.IsNullOrWhiteSpace(title))
                throw new ArgumentException("Title is required");

            if (string.IsNullOrWhiteSpace(description))
                throw new ArgumentException("Description is required");

            if (categoryId <= 0)
                throw new ArgumentException("Invalid category");

            return new Ticket
            {
                Id = Guid.NewGuid(),
                Title = title.Trim(),
                Description = description.Trim(),
                CategoryId = categoryId,
                Priority = priority,
                Status = TicketStatus.New,
                CreatedByUserId = createdByUserId,
                CreatedAtUtc = DateTime.UtcNow
            };
        }

        public void TransitionTo(TicketStatus newStatus)
        {
            if (!IsValidTransition(Status, newStatus))
                throw new InvalidOperationException(
                    $"Invalid transition from {Status} to {newStatus}");

            Status = newStatus;
            UpdatedAtUtc = DateTime.UtcNow;
        }

        private static bool IsValidTransition(TicketStatus from, TicketStatus to)
        {
            return (from, to) switch
            {
                (TicketStatus.New, TicketStatus.Open) => true,
                (TicketStatus.Open, TicketStatus.InProgress) => true,
                (TicketStatus.InProgress, TicketStatus.OnHold) => true,
                (TicketStatus.OnHold, TicketStatus.InProgress) => true,
                (TicketStatus.InProgress, TicketStatus.Resolved) => true,
                (TicketStatus.Resolved, TicketStatus.Closed) => true,
                _ => false
            };
        }
    }
}


using System;
using CustomerSupport.Domai.Enums;

namespace CustomerSupport.Domai.Entities
{
    public class TicketStatusHistory
    {
        public Guid Id { get; private set; }

        public Guid TicketId { get; private set; }

        public TicketStatus FromStatus { get; private set; }
        public TicketStatus ToStatus { get; private set; }

        public Guid ChangedByUserId { get; private set; }
        public DateTime ChangedAtUtc { get; private set; }

        public string? Reason { get; private set; }  // optional text

        private TicketStatusHistory() { } // EF

        public static TicketStatusHistory Create(
            Guid ticketId,
            TicketStatus fromStatus,
            TicketStatus toStatus,
            Guid changedByUserId,
            string? reason = null)
        {
            return new TicketStatusHistory
            {
                Id = Guid.NewGuid(),
                TicketId = ticketId,
                FromStatus = fromStatus,
                ToStatus = toStatus,
                ChangedByUserId = changedByUserId,
                ChangedAtUtc = DateTime.UtcNow,
                Reason = string.IsNullOrWhiteSpace(reason) ? null : reason.Trim()
            };
        }
    }
}


// File: CustomerSupport.Api/Contracts/Tickets/TicketResponse.cs
using System;

namespace CustomerSupport.Api.Contracts.Tickets
{
    public sealed class TicketResponse
    {
        public Guid Id { get; init; }
        public string Title { get; init; } = string.Empty;
        public string Description { get; init; } = string.Empty;

        public string Status { get; init; } = string.Empty;   // e.g., "New"
        public string Priority { get; init; } = string.Empty; // e.g., "Medium"

        public int CategoryId { get; init; }                  // <-- int (matches domain)
        public Guid CreatedByUserId { get; init; }
        public Guid? AssignedToUserId { get; init; }

        public DateTime CreatedAtUtc { get; init; }
        public DateTime? UpdatedAtUtc { get; init; }
    }
}


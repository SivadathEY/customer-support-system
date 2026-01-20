
using System;

namespace CustomerSupport.Api.Contracts.Tickets
{
    public sealed class UpdateTicketStatusRequest
    {
        // "Open" | "InProgress" | "OnHold" | "Resolved" | "Closed"
        public required string ToStatus { get; init; }

        // Who is attempting the change (auth integration later)
        public required Guid ChangedByUserId { get; init; }

        // Optional human-readable reason (store in history if you like)
        public string? Reason { get; init; }
    }
}

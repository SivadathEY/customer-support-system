
using System;

namespace CustomerSupport.Api.Contracts.Tickets
{
    public sealed class CreateTicketRequest
    {
        public required string Title { get; init; }          // use required to silence warnings
        public required string Description { get; init; }

        public string Priority { get; init; } = "Medium";     // "Low" | "Medium" | "High" | "Critical"

        public int CategoryId { get; init; }                  // <-- int (matches domain)
        public Guid CreatedByUserId { get; init; }

        // Keep it if you plan to support assignment later, but we won't pass it to the factory now
        public Guid? AssignedToUserId { get; init; }
    }
}

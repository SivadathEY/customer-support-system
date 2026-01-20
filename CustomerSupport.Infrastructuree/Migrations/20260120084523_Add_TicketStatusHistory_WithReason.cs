using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CustomerSupport.Infrastructuree.Migrations
{
    /// <inheritdoc />
    public partial class Add_TicketStatusHistory_WithReason : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Reason",
                table: "TicketStatusHistory",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TicketStatusHistory_ChangedAtUtc",
                table: "TicketStatusHistory",
                column: "ChangedAtUtc");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TicketStatusHistory_ChangedAtUtc",
                table: "TicketStatusHistory");

            migrationBuilder.DropColumn(
                name: "Reason",
                table: "TicketStatusHistory");
        }
    }
}

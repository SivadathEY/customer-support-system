
using CustomerSupport.Domai.Entities;
using Microsoft.EntityFrameworkCore;

namespace CustomerSuport.Infrastructuree
{
    // Make public so API project can see it
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        // Expose DbSets (singular name to match controller usage)
        public DbSet<Ticket> Tickets => Set<Ticket>();
        public DbSet<TicketStatusHistory> TicketStatusHistory => Set<TicketStatusHistory>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // ---- Tickets ----
            modelBuilder.Entity<Ticket>(b =>
            {
                b.ToTable("Tickets");
                b.HasKey(x => x.Id);

                b.Property(x => x.Title).HasMaxLength(200).IsRequired();
                b.Property(x => x.Description).HasMaxLength(4000).IsRequired();

                b.Property(x => x.Status).HasConversion<int>().IsRequired();
                b.Property(x => x.Priority).HasConversion<int>().IsRequired();

                b.Property(x => x.CategoryId).IsRequired();
                b.Property(x => x.CreatedByUserId).IsRequired();
                b.Property(x => x.AssignedToUserId);
                b.Property(x => x.CreatedAtUtc).IsRequired();
                b.Property(x => x.UpdatedAtUtc);

                b.HasIndex(x => new { x.Status, x.Priority });
                b.HasIndex(x => x.CreatedByUserId);
                b.HasIndex(x => x.AssignedToUserId);
                b.HasIndex(x => x.CategoryId);
            });

            // ---- TicketStatusHistory ----
            modelBuilder.Entity<TicketStatusHistory>(b =>
            {
                b.ToTable("TicketStatusHistory");
                b.HasKey(x => x.Id);

                b.Property(x => x.FromStatus).HasConversion<int>().IsRequired();
                b.Property(x => x.ToStatus).HasConversion<int>().IsRequired();
                b.Property(x => x.ChangedByUserId).IsRequired();
                b.Property(x => x.ChangedAtUtc).IsRequired();

                // Optional text reason (nullable). Length cap to keep it reasonable.
                b.Property(x => x.Reason).HasMaxLength(1000);

                b.HasIndex(x => x.TicketId);
                b.HasIndex(x => x.ChangedAtUtc);

                b.HasOne<Ticket>()      // no navigation prop on the entity (simple)
                 .WithMany()
                 .HasForeignKey(x => x.TicketId)
                 .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}

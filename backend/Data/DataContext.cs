using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using backend.Models;

namespace backend.Data
{
    public partial class DataContext : DbContext
    {
        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Products> Products { get; set; }  //  << this is a TABLE NAME!!
        public virtual DbSet<Users> Users { get; set; }  //  << this is a TABLE NAME!!

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Products>(entity =>
            {
                entity.HasKey(e => e.ProductId);

                entity.Property(e => e.ProductId)
                    .HasColumnName("product_id")
                    .ValueGeneratedOnAdd();  // For SQLite only!!
                    // .ValueGeneratedNever();

                entity.Property(e => e.Image).HasColumnName("image");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.Stock).HasColumnName("stock");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("ID")
                    .ValueGeneratedOnAdd();  // For SQLite only!!!
                    // .ValueGeneratedNever();

                entity.Property(e => e.Username).IsRequired();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}

//namespace Calender.Models
//{
//	using System;
//	using System.Data.Entity;
//	using System.ComponentModel.DataAnnotations.Schema;
//	using System.Linq;

//	public partial class Mysql : DbContext
//	{
//		public Mysql()
//			: base("name=Mysql")
//		{
//		}

//		public virtual DbSet<User> user { get; set; }
//		public virtual DbSet<Userlogin> userlogin { get; set; }

//		protected override void OnModelCreating(DbModelBuilder modelBuilder)
//		{
//			modelBuilder.Entity<User>()
//				.Property(e => e.username)
//				.IsUnicode(false);

//			modelBuilder.Entity<User>()
//				.Property(e => e.firstname)
//				.IsUnicode(false);

//			modelBuilder.Entity<User>()
//				.Property(e => e.lastname)
//				.IsUnicode(false);

//			modelBuilder.Entity<User>()
//				.Property(e => e.email)
//				.IsUnicode(false);

//			modelBuilder.Entity<User>()
//				.Property(e => e.password)
//				.IsUnicode(false);

//			modelBuilder.Entity<User>()
//				.HasMany(e => e.userlogin)
//				.WithRequired(e => e.user)
//				.HasForeignKey(e => e.userid)
//				.WillCascadeOnDelete(false);

//			modelBuilder.Entity<Userlogin>()
//				.Property(e => e.encryptkey)
//				.IsUnicode(false);

//			modelBuilder.Entity<Userlogin>()
//				.Property(e => e.encryptvalue)
//				.IsUnicode(false);
//		}
//	}
//}

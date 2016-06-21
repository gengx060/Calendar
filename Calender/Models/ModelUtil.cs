using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Web;
//using Microsoft.AspNet.SignalR;

namespace Calender.Models
{
	public static class ModelUtil
	{
		public static int TrySaveChanges(this DbContext db)
		{
			int ret = -1;
			string str = "";
			try
			{
				ret = db.SaveChanges();
			}
			catch (DbEntityValidationException dbEx)
			{
				foreach (var validationErrors in dbEx.EntityValidationErrors)
				{
					foreach (var validationError in validationErrors.ValidationErrors)
					{
						Trace.TraceInformation("Property: {0} Error: {1}",
												validationError.PropertyName,
												validationError.ErrorMessage);
						str += String.Format("Property: {0} Error: {1}",
												validationError.PropertyName,
												validationError.ErrorMessage);
					}
				}
			}
			catch (Exception dbEx)
			{
				Trace.TraceInformation("db TrySaveChanges error:"+ dbEx.Message);
				str += "db TrySaveChanges error:" + dbEx.Message;
			}
			return ret;
		}
	}
}
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Web;
using Microsoft.Owin;
//using Microsoft.AspNet.SignalR;

namespace Calender.Models
{
	public static class ModelUtil
	{
		public static string GetClientIp(HttpRequestMessage req)
		{
			string ip = null;
			// Web-hosting. Needs reference to System.Web.dll
			if (req.Properties.ContainsKey("MS_HttpContext"))
			{
				ip = ((HttpContextWrapper)req.Properties["MS_HttpContext"]).Request.UserHostAddress;
			}

			string OwinContext = "MS_OwinContext";
			// Self-hosting using Owin
			if (req.Properties.ContainsKey(OwinContext))
			{
				OwinContext owinContext = (OwinContext)req.Properties[OwinContext];
				if (owinContext != null)
				{
					ip = owinContext.Request.RemoteIpAddress;
				}
			}

			if (ip == "::1")
			{
				ip = "127.0.0.1";
			}

			return ip;
		}

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
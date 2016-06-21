using System;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using System.ServiceModel;
using Microsoft.Owin;
using Calender.Models;
using System.Data.Entity.Validation;
using System.Diagnostics;
using GGEncrypt;
using System.Threading.Tasks;
using System.Web.Helpers;
using Calender.Models.Rule;

namespace Calender.Controllers
{
	public class LoginController : ApiController
	{
		//private Mysql _db = new Mysql();
		private Entities _db = new Entities();

		// GET api/<controller>
		public IEnumerable<string> Get()
		{
			return new string[] { "value1", "value2" };
		}

		// GET api/<controller>/5
		public string Get(int id)
		{
			return "value";
		}

		// POST api/<controller>
		public void Post([FromBody]string value)
		{
		}

		// PUT api/<controller>/5
		public void Put(int id, [FromBody]string value)
		{
		}

		// DELETE api/<controller>/5
		public void Delete(int id)
		{
		}

		private string GetClientIp(HttpRequestMessage req)
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

		[HttpPost]
		public IHttpActionResult Login([FromBody]JObject json)
		{
			dynamic args = json;
			//Session["test"] = "";
			HttpContext.Current.Session["test"] = "";
			string email = args.email;
			string password = args.password.ToString();
			var user = _db.user.FirstOrDefault(o => o.email == email);
				
			if(Encryption.CompareHashFromPassword(user.password.ToString(), password))
			{
				// Match!
				Userlogin login = new Models.Userlogin()
				{
					//firstname = user.iduser,
					//lastname = ob.lastName,
					//username = ob.firstName,
					//email = ob.email,
					//password = Encryption.GenerateSHA256Hash(ob.password.ToString()),
					//org_id = null
				};
				return Ok(user);
			}
			else
			{
				return Content(HttpStatusCode.InternalServerError, "Wrong username and password!");
			}

			args.ip = GetClientIp(Request);

			HttpCookie aCookie = new HttpCookie("lastVisit");
			aCookie.Value = DateTime.Now.ToString();
			aCookie.Expires = DateTime.Now.AddDays(1);
			args.cookies = aCookie.Value;


			return Ok(user);
		}

		[HttpPost]
		public async Task<IHttpActionResult> Signup([FromBody]JObject json)
		{
			dynamic ob = json;
			int ret = -1;
			string str = "";
			await Task.Run(() =>
			{
				User user = new Models.User()
				{
					firstname = ob.firstName,
					lastname = ob.lastName,
					username = ob.firstName,
					email = ob.email,
					password = Encryption.GenerateSHA256Hash(ob.password.ToString()),
					org_id = null
				};

				_db.user.Add(user);
				ret = _db.TrySaveChanges();
			});

			return ret > 0 ? Ok(ob): Content(HttpStatusCode.InternalServerError, str);
		}

		[HttpPost]
		public IHttpActionResult Token()
		{
			Token token = new Token();
			JObject json = JObject.FromObject(new { antiForgeryToken = token.GenerateTokenWithId(10) }); ;
			return Ok(json);
		}
	}
}
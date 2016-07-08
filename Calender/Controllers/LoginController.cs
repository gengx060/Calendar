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


		[HttpPost]
		public async Task<IHttpActionResult> Login([FromBody]JObject json)
		{
			dynamic args = json;
			//Session["test"] = "";
			//HttpContext.Current.Session["test"] = "";
			IHttpActionResult res =  await Task.Run<IHttpActionResult>(() => {

				string email = args.email;
				string password = args.password.ToString();
				var user = _db.user.FirstOrDefault(o => o.email == email);

				if (user != null && Encryption.CompareHashFromPassword(user.password.ToString(), password))
				{
					Token token = new Token();
					JObject json1 = JObject.FromObject(new {
						antiForgeryToken = token.GenerateTokenWithId(user.iduser, ModelUtil.GetClientIp(Request)),
						userid = user.iduser,
						orgid = user.org_id ?? user.iduser
					});
					return Ok(json1);
				}
				else
				{
					return Content(HttpStatusCode.Forbidden, "Wrong username and password!");
				}
			});

			return res;

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

				try
				{
					_db.user.Add(user);
					ret = _db.SaveChanges();
				}
				catch(Exception e)
				{
					str = e.Message;
				}
			});

			return ret > 0 ? Ok(ob): Content(HttpStatusCode.InternalServerError, str);
		}

		[HttpPost]
		public IHttpActionResult Token()
		{
			Token token = new Token();

			JObject json = null;
			Task.Run(() =>
			{
				JObject.FromObject(new { antiForgeryToken = token.GenerateTokenWithId(10, ModelUtil.GetClientIp(Request)) }); ;
			});
			return Ok(json);
		}

		[HttpPost]
		public IHttpActionResult IsSignedIn()
		{
			return Ok("ok"); // already authorized before
		}
	}
}
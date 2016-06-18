﻿using System;
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

namespace Calender.Controllers
{
	public class LoginController : ApiController
	{
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
			dynamic user = json;
			user.ip = GetClientIp(Request);
			if (user.email != "s@s")
			{
				return BadRequest("wrong username and password!");
			}

			HttpCookie aCookie = new HttpCookie("lastVisit");
			aCookie.Value = DateTime.Now.ToString();
			aCookie.Expires = DateTime.Now.AddDays(1);
			user.cookies = aCookie.Value;

			////var req = this.Request;
			//IHttpActionResult res = Ok(user);
			//res.
			return Ok(user);
		}
	}
}
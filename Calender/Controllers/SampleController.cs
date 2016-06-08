using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

namespace Calender.Controllers
{
	public class SampleController : ApiController
	{
		[HttpPost]
		public IHttpActionResult Test([FromBody]JObject json)
		{
			dynamic album = json;
			album.name = "json";
			return Ok(album);// Request.CreateResponse(HttpStatusCode.OK, album); //(album);
			//return Json<JObject>(new { success = true, responseText = "Your message successfuly sent!" });

			//var req = this.Request;
			//return Json(new { success = true, responseText = "Your message successfuly sent!" }, JsonRequestBehavior.AllowGet);
			//return Json("View()");
		}

		[HttpPost]
		public IHttpActionResult Test2([FromBody]JObject json)
		{
			dynamic album = json;
			var a = album.id;
			album.name = "json";
			//return JsonConvert.SerializeObject(album);
			//return Json<JObject>(new { success = true, responseText = "Your message successfuly sent!" });

			//var req = this.Request;
			return Ok(album);
			//return Json("View()");
		}
	}
}

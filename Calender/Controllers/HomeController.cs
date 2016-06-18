using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Calender.Controllers
{
	[Authorize]
	public class HomeController : Controller
	{
		public ActionResult Index()
		{
			return View();
			//return Redirect(Url.Content("index.html"));
		}
	}
}

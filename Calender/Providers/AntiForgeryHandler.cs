using Calender.Models.Rule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Helpers;

namespace Calender
{
	internal class AntiForgeryHandler: DelegatingHandler
	{
		protected override Task<HttpResponseMessage> SendAsync(
				HttpRequestMessage request,
				CancellationToken cancellationToken)
		{
			var cookie = string.Empty;
			var form = string.Empty;

			IEnumerable<string> antiForgeryHeaders;
			if (request.RequestUri.LocalPath != "/api/Login/Token")
			{
				if (request.Headers.TryGetValues("antiForgeryToken", out antiForgeryHeaders))
				{
					var tokens = antiForgeryHeaders.First();
					Token token = new Token();
					if (token.validate(tokens))
					{
						return base.SendAsync(request, cancellationToken);
					}
				}

				var res = new HttpResponseMessage(HttpStatusCode.Forbidden)
				{
					Content = new StringContent("Illigal request!")
				};
				return Task.FromResult(res);

				//try
				//{
				//	//AntiForgery.Validate(cookie, form);
				//	Token token = new Token();
				//	token.validate(tokens);
				//}
				//catch(Exception e)
				//{
				//	var res = new HttpResponseMessage(HttpStatusCode.Forbidden)
				//	{
				//		Content = new StringContent("Illigal request!")
				//	};
				//	return Task.FromResult(res);
				//}
				//var res1 = new HttpResponseMessage(HttpStatusCode.Forbidden)
				//{
				//	Content = new StringContent("Illigal request!")
				//};
				//return Task.FromResult(res1);
			}
			return base.SendAsync(request, cancellationToken);
		}
	}
}

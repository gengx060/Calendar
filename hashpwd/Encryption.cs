using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GGEncrypt
{
	public class Encryption
	{
		public static int saltlength = 16;

		public static string CreateSalt(int size)
		{
			var rng = new System.Security.Cryptography.RNGCryptoServiceProvider();
			var buff = new byte[size];
			rng.GetBytes(buff);

			return BitConverter.ToString(buff).Replace("-", String.Empty);
		}

		public static string GenerateSHA256Hash(string input, string salt=null)
		{
			salt = salt ?? CreateSalt(saltlength);
			byte[] bytes = System.Text.Encoding.UTF8.GetBytes(input + salt ?? CreateSalt(16));
			System.Security.Cryptography.SHA256Managed sha = new System.Security.Cryptography.SHA256Managed();
			byte[] hash = sha.ComputeHash(bytes);
			
			return BitConverter.ToString(hash).Replace("-", String.Empty) + salt;
		}

		public static bool CompareHashFromPassword(string hashedPassword, string password)
		{
			bool ret = false;
			string salt = hashedPassword.Substring(hashedPassword.Length - saltlength*2);
			byte[] bytes = System.Text.Encoding.UTF8.GetBytes(password + salt);
			System.Security.Cryptography.SHA256Managed sha = new System.Security.Cryptography.SHA256Managed();
			byte[] hash = sha.ComputeHash(bytes);

			if(hashedPassword == BitConverter.ToString(hash).Replace("-", String.Empty) + salt)
			{
				ret = true;
			}
			return ret;
		}


		public static string GenerateToken()
		{
			byte[] time = BitConverter.GetBytes(DateTime.UtcNow.ToBinary());
			byte[] key = Guid.NewGuid().ToByteArray();
			string token = Convert.ToBase64String(time.Concat(key).ToArray());

			return token;
		}

		static void Main(string[] args)
		{
			string str = "gai geng";
			string salt = CreateSalt(saltlength);
			Console.WriteLine(salt);
			string hash = GenerateSHA256Hash(str, salt);
			Console.WriteLine(hash);
			salt = CreateSalt(saltlength);
			hash = GenerateSHA256Hash(str, salt);
			Console.WriteLine(salt);
			Console.WriteLine(hash);
			Console.WriteLine(hash.Length);
			string hash2 = GenerateSHA256Hash(str, salt);
			Console.WriteLine(hash2);
			Console.WriteLine(CompareHashFromPassword(hash2, str));
			Console.WriteLine(CompareHashFromPassword(hash, str+'1'));
			Console.ReadLine();
		}
	}
}

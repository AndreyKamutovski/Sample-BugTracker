using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace Sample_BugTracker.API.Providers
{
    public class StreamProvider : MultipartFormDataStreamProvider
    {
        public StreamProvider(string rootPath) : base(rootPath)
        {
        }

        public override string GetLocalFileName(HttpContentHeaders headers)
        {
            string fileName =  headers.ContentDisposition.FileName;
            if (string.IsNullOrWhiteSpace(fileName))
            {
                fileName = ".data";
            }
            fileName = string.Format("{0}_{1}", Guid.NewGuid(), fileName);
            return fileName.Replace("\"", string.Empty);
        }
    }
}
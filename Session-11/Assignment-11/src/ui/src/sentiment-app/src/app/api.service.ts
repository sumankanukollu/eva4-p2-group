import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({
   providedIn: 'root'
})

export class ApiService {
  constructor(private httpClient: HttpClient) {}
  
  public translate(germanSentence: string): Observable<any> {
    console.log('Before translation: ' + germanSentence);
    var translationData = {
       germanText : germanSentence
    }
    var response = this.httpClient.post<any>('https://75t4f99u03.execute-api.ap-south-1.amazonaws.com/dev/translate',
    JSON.stringify(translationData));
    return response;
 }

 public generateCaption(image: File): Observable<any> {
   console.log('Before image captioning: ' + image);
   const formData = new FormData();
   formData.append('image', image);

   var response = this.httpClient.post<any>('https://jqpz0x3yhl.execute-api.ap-south-1.amazonaws.com/dev/caption',
   formData);
   return response;
}

public speechToText(audioFile: File): Observable<any> {
   console.log('Before speech to text: ' + audioFile.name);
   const formData = new FormData();
   formData.append('data', audioFile);

   var response = this.httpClient.post('https://yu1j7kt463.execute-api.ap-south-1.amazonaws.com/dev/speechToText',
   formData,
   {responseType: 'text'}); // API returns text instead of json
   return response;
}
}

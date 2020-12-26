import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css']
})
export class SentimentAnalysisComponent {

  public response: Observable<any>;
  file:File = null!;
  isProcessing = false;
  isTrained = false;
  filePreview:string = '';
  sentimentSentence = '';
  uploadedFile:string = ''

  constructor(private apiService: ApiService) {  }

  onSelectFile(event: Event) { // called each time file input changes
    const input = event.target as HTMLInputElement;
    if (!input.files.length) {
      return;
    }

    this.file = input.files[0];
    console.log(this.file);
    var reader = new FileReader();
    // reader.readAsDataURL(this.file); // read file as data url
    reader.readAsText(this.file);
    reader.onload = (event: Event) => { // called once readAsDataURL is completed
        this.filePreview = reader.result as string;
    }
    this.apiService.upload(this.file).subscribe(data =>
      {
        console.log('Response: ' + JSON.stringify(data));
        this.uploadedFile = data.uploadedfile;
        this.isProcessing = false;
      },
      error => { //Error callback
        console.error('error caught in component')
        this.isProcessing = false;
        alert("An error occured while processing the request, Please retry the operation!!!\nError Details: " + error);
      });
  }

  trainModel(){
    console.log("Training started...");
    this.isTrained = false;
    this.isProcessing = true;
    setTimeout(() => {
      console.log('hello');
      console.log("Training Completed...");
      this.isTrained = true;
      this.isProcessing = false;
    }, 5000);
  }

  predictSentiment(value: string): void {
    this.sentimentSentence = `${value}`;
    console.log('Sentiment Sentence: ' + this.sentimentSentence);
    this.isProcessing = true;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
// import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {
  constructor(
    // private messageService: MessageService, private primengConfig: PrimeNGConfig
    ) {
   }
  @Input() isLoading = false;
  ngOnInit(): void {
    
  }
  showSuccess(mess) {
  }
  showError(mess) {
  }
}

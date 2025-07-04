import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: any;

  // Sample user data (in a real app, this would come from a service/API)
  private sampleUsers = [
    { name: 'John Doe', email: 'john@example.com', mobile: '1234567890', totalYearsExperience: 5, relevantYearsExperience: 3, currentCTC: '5 LPA', expectedCTC: '7 LPA', noticePeriod: '1 month', reasonForJobChange: 'Career growth', currentLocation: 'Bangalore', skillset: 'Angular, Node.js, MongoDB', linkedinProfile: 'https://linkedin.com/in/johndoe' },
    { name: 'Jane Smith', email: 'jane@example.com', mobile: '9876543210', totalYearsExperience: 8, relevantYearsExperience: 6, currentCTC: '10 LPA', expectedCTC: '12 LPA', noticePeriod: '2 months', reasonForJobChange: 'Better opportunities', currentLocation: 'Hyderabad', skillset: 'React, Python, AWS', linkedinProfile: 'https://linkedin.com/in/janesmith' },
    { name: 'Alice Johnson', email: 'alice@example.com', mobile: '1122334455', totalYearsExperience: 3, relevantYearsExperience: 2, currentCTC: '4 LPA', expectedCTC: '6 LPA', noticePeriod: '15 days', reasonForJobChange: 'New challenges', currentLocation: 'Chennai', skillset: 'Vue.js, Java, Spring Boot', linkedinProfile: 'https://linkedin.com/in/alicejohnson' },
    { name: 'Bob Williams', email: 'bob@example.com', mobile: '9988776655', totalYearsExperience: 10, relevantYearsExperience: 8, currentCTC: '15 LPA', expectedCTC: '18 LPA', noticePeriod: '3 months', reasonForJobChange: 'Relocation', currentLocation: 'Pune', skillset: 'Angular, .NET, Azure', linkedinProfile: 'https://linkedin.com/in/bobwilliams' }
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const userName = params.get('id');
      this.user = this.sampleUsers.find(user => user.name === userName);
    });
  }

}

export class AddClickResponseDto {
  newClicksPerUser: number;
  newClicksPerTeam: number;

  constructor(newClicksPerUser: number, newClicksPerTeam: number) {
    this.newClicksPerUser = newClicksPerUser;
    this.newClicksPerTeam = newClicksPerTeam;
  }
}

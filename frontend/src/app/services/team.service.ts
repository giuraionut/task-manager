import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/APIResponse.model';
import { Team } from '../models/Team.model';
import { map, take } from 'rxjs/operators';
import { User } from '../models/User.model';
@Injectable({ providedIn: 'root' })
export class TeamService {
  private url = 'http://localhost:8080/team';

  constructor(private http: HttpClient) {}

  public createTeam(team: Team): Observable<APIResponse> {
    return this.http
      .post<APIResponse>(`${this.url}`, team, { withCredentials: true })
      .pipe(take(1));
  }
  public deleteTeam(): Observable<void> {
    return this.http
      .delete<APIResponse>(`${this.url}`, { withCredentials: true })
      .pipe(map((response: APIResponse) => {}));
  }

  public getTeam(): Observable<Team> {
    return this.http
      .get<APIResponse>(`${this.url}`, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          let team: Team = response.payload;
          return team;
        })
      );
  }

  public getTeamMembers(): Observable<Array<User>> {
    return this.http
      .get<APIResponse>(`${this.url}/members`, { withCredentials: true })
      .pipe(
        map((response: APIResponse) => {
          let members: Array<User> = response.payload;
          return members;
        })
      );
  }

  public kickTeamMember(userId: string): Observable<void> {
    return this.http
      .put<APIResponse>(`${this.url}/kick/${userId}`, null, {
        withCredentials: true,
      })
      .pipe(map((response: APIResponse) => {}));
  }

  public acceptInvite(teamId: String) {
    return this.http
      .put<APIResponse>(`${this.url}/add/${teamId}`, null, {
        withCredentials: true,
      })
      .pipe(map((response: APIResponse) => {}));
  }

  public uploadAvatar(image: FormData): Observable<void> {
    return this.http
      .put<APIResponse>(`${this.url}/avatar`, image, { withCredentials: true })
      .pipe(map((response: APIResponse) => {}));
  }

  public leaveTeam(): Observable<void> {
    return this.http
      .put<APIResponse>(`${this.url}/leave`, null, { withCredentials: true })
      .pipe(map(() => {}));
  }
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationService } from '../../authentication/services/authentication.service';
import { login, loginFailed, loginSuccess } from './auth.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthEffects {

  constructor(private actions$: Actions,
              private authService: AuthenticationService) {
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        this.authService
          .authenticate(action.payload.email, action.payload.password)
          .pipe(
            map((loggedUser) =>
              loginSuccess({
                payload: {
                  loggedUser,
                },
              })
            ),
            catchError(() => of(loginFailed()))
          )
      )
    )
  );

}

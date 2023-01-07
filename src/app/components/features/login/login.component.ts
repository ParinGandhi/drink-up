import { Component, OnInit } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CommonUtilitiesService } from 'src/app/services/common-utilities.service';
import { environment } from 'src/environments/environment';
import { AppState } from 'src/app/model/AppState.model';
import { User } from 'src/app/model/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  tabSelection: string = 'login';
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  passwordMatch: string = '';
  // user: User = new User();
  checkEmail: boolean = false;

  supaBase: SupabaseClient = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

  constructor(private commonUtils: CommonUtilitiesService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.commonUtils.toggleLoading(true);
    }, 2000);
    setTimeout(() => {
      this.commonUtils.toggleLoading(false);
    }, 5000);
  }

  signUp = async () => {
    try {
      const createdUser = await this.supaBase.auth.signUp({
        email: this.email,
        password: undefined,
      });
      if (createdUser.error) {
        throw createdUser.error;
      }
      this.addUser(createdUser);
    } catch (error: any) {
      console.error(error);
      this.commonUtils.setToastr('error', error.message, 'Error signing up');
    }
  };

  addUser = async (resp: any) => {
    try {
      const { error } = await this.supaBase.from('registered_users').insert({
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        fk_user_uid: resp.user.id,
      });
      if (error) throw error;
      this.checkEmail = true;
    } catch (error) {
      console.log(error);
    } finally {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.passwordMatch = '';
    }
  };

  login = async () => {
    const resp = await this.supaBase.auth.signIn({
      email: this.email,
      password: this.password,
    });
    console.log('Login response:', resp);
    this.getUserInfo(resp?.user?.id);
  };

  getUserInfo = async (userUid: string | undefined) => {
    if (userUid) {
      const { data, error } = await this.supaBase
        .from('registered_users')
        .select('*')
        .eq('fk_user_uid', userUid);
      console.log(data);

      // if (data && data.length > 0) {
      //   this.user = data[0];
      //   window.sessionStorage.setItem('userInfo', JSON.stringify(this.user));
      //   this.store.dispatch(setUserInfoAction({ userInfo: this.user }));
      //   this.commonUtils.setToastr(
      //     Constants.TOASTR_TYPE.SUCCESS,
      //     `Successfully logged in as ${this.user.first_name} ${this.user.last_name}`,
      //     'Login'
      //   );
      //   this.router.navigate(['/recipes']);
      // }
    }
  };

  changeTab(selection: string) {
    const loginTab = document.getElementById('login');
    const signUpTab = document.getElementById('signUp');
    this.tabSelection = selection;

    if (selection === 'login') {
      loginTab?.classList.add('active');
      signUpTab?.classList.remove('active');
    } else {
      signUpTab?.classList.add('active');
      loginTab?.classList.remove('active');
    }
  }
}

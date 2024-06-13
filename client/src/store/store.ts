import { makeAutoObservable } from "mobx";
import { IUser } from "../model/IUser";
import AuthService from "../servises/AuthService";
import { AuthResponse } from "../model/response/AuthResponse";
import { AxiosError } from "axios";
import axios from "axios";
import { API_URL } from "../http";

export default class Store {
    user={} as IUser;
    isAuth=false;

    constructor(){
        makeAutoObservable(this);
    }

    setAuth(bool:boolean){
        this.isAuth=bool;
    }
    setUser(user:IUser){
        this.user=user;
    }

    async login(email:string, password:string){
        try {
            const response=await AuthService.login(email,password);
            localStorage.setItem("token",response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            console.log(error);
        }
    }

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e:unknown) {
            if(e instanceof AxiosError){
                console.log(e.response?.data?.message);
            } else {
                console.error('An unexpected error occurred:', e)
            }
        }
    }
    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e:unknown) {
            if(e instanceof AxiosError){
                console.log(e.response?.data?.message);
            } else {
                console.error('An unexpected error occurred:', e)
            }
        }
    }

    async checkAuth(){
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`,{withCredentials:true});
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (error) {
            if(error instanceof AxiosError){
                console.log(error.response?.data?.message);
            } else {
                console.error('An unexpected error occurred:', error)
            }
        }
    }

}
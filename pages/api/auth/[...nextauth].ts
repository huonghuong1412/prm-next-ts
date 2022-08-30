import NextAuth from "next-auth";
import axios from 'axios';
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

const API_URL = 'https://sukien.doppelherz.vn/api/login';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: 'credentials',
            type: 'credentials',
            credentials: {
                phone: { label: "Phone", type: "text", placeholder: "Phone" },
                password: { label: "Password", type: "password", placeholder: 'Password' }
            },
            authorize: async (credentials, req) => {
                const payload : any = {
                    phone: credentials?.phone,
                    password: credentials?.password,
                };
                const user = await (await axios.post(API_URL, payload)).data;
                if (user.status_code === 200) {
                    return {
                        access_token: user.access_token,
                        status_code: user.status_code,
                        token_type: user.token_type,
                        login_type: 'credentials'
                    };
                }
                else return null;
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
    ],
    secret: process.env.SECRET,

    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,
    },
    jwt: {
        secret: process.env.SECRET,
    },
    pages: {
        signIn: '/dangnhap',
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.data = user
            }
            return token
        },
        session: async ({ session, token } : any) => {
            if (token.data) {
                session.user = token.data
            }
            return session
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
    events: {},
    debug: false,
})

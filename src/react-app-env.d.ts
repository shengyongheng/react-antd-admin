/// <reference types="react-scripts" />
declare module 'react-router-dom';

interface Routes {
    path: string;
    component: any;
    exact?: boolean;
    children?: Routes[];
    meta?: {
        title: string;
    }
}
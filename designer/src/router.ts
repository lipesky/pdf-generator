import { createRouter, createWebHashHistory } from 'vue-router';
import ReportHeader from './example/ReportHeader.vue';
import ReportFooter from './example/ReportFooter.vue';
import ReportBody from './example/ReportBody.vue';
import DesignerPage from './designer/DesignerPage.vue';

const routes = [
    {
        path: '/body',
        component: ReportBody,
    },
    {
        path: '/footer',
        component: ReportFooter,
    },
    {
        path: '/header',
        component: ReportHeader,
    },
    {
        path: '/',
        component: DesignerPage,
    },
];
export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
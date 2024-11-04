import { createRouter, createWebHistory } from 'vue-router';

//Teacher
import DashboardTC from '@/pages/role/teacher/Dashboard.vue';

//Superadmin
import DashboardSA from '@/pages/role/superadmin/Dashboard.vue';
import CourseManagement from '@/pages/role/superadmin/CourseManagement.vue';
import FaqAdmin from '@/pages/role/superadmin/Faq.vue';
import HelpCenter from '@/pages/role/superadmin/HelpCenter.vue';
import MediaPartner from '@/pages/role/superadmin/cms/MediaPartner.vue';
import SocialMedia from '@/pages/role/superadmin/cms/SocialMedia.vue';
import AboutUs from '@/pages/role/superadmin/cms/AboutUs.vue';
<<<<<<< HEAD
import CategoryMD from '@/pages/role/superadmin/masterdata/CategoryMD.vue';
import SkillsMD from '@/pages/role/superadmin/masterdata/SkillsMD.vue';
import LevelCourseMD from '@/pages/role/superadmin/masterdata/LevelCourseMD.vue';
import LevelTeacherMD from '@/pages/role/superadmin/masterdata/LevelTeacherMD.vue';
import ToolsMD from '@/pages/role/superadmin/masterdata/ToolsMD.vue';
import TncMD from '@/pages/role/superadmin/masterdata/TncMD.vue';
=======
import MasterDataCategory from '@/pages/role/superadmin/masterdata/CategoryMD.vue';
import MasterDataSkill from '@/pages/role/superadmin/masterdata/SkillsMD.vue';
import MasterDataLevelCourse from '@/pages/role/superadmin/masterdata/LevelCourseMD.vue';
import MasterDataLevelTeacher from '@/pages/role/superadmin/masterdata/LevelTeacherMD.vue';
import MasterDataTools from '@/pages/role/superadmin/masterdata/ToolsMD.vue';
import MasterDataTnc from '@/pages/role/superadmin/masterdata/TncMD.vue';
>>>>>>> 7a2a34bba47de2e22a05d9d253ec7484f1468dd7

//Auth Teacher
import Login from '@/pages/auth/Login.vue';
import RegistrasiTeacher from '@/pages/auth/Registrasi-teacher.vue';
import Verificationemail from '@/pages/auth/Verificationemail.vue';

import Error from '@/pages/404/404.vue';

//TEST
import Test from '@/pages/Test.vue';

const routes = [

    //Auth Superadmin
  { path: '/', component: Login },
  { path: '/registrasi-teacher', component: RegistrasiTeacher },
  { path: '/verification-email', component: Verificationemail },
  
  //Teacher
  { path: '/dashboard-teacher', component: DashboardTC, meta: { requiresAuth: true, role: 'teacher' } },

  //Superadmin
  { path: '/dashboard-superadmin', component: DashboardSA },
  { path: '/course-management', component: CourseManagement },
  { path: '/faq-admin', component: FaqAdmin },
  { path: '/help-center', component: HelpCenter },
  { path: '/cms/media-partner', component: MediaPartner },
  { path: '/cms/social-media', component: SocialMedia },
  { path: '/cms/about-us', component: AboutUs },
<<<<<<< HEAD
  { path: '/master-data/category', component: CategoryMD },
  { path: '/master-data/skills', component: SkillsMD },
  { path: '/master-data/level-course', component: LevelCourseMD },
  { path: '/master-data/level-teacher', component: LevelTeacherMD },
  { path: '/master-data/tools', component: ToolsMD },
  { path: '/master-data/tnc', component: TncMD },
=======
  { path: '/master-data/category', component: MasterDataCategory },
  { path: '/master-data/skills', component: MasterDataSkill },
  { path: '/master-data/level-course', component: MasterDataLevelCourse },
  { path: '/master-data/level-teacher', component: MasterDataLevelTeacher },
  { path: '/master-data/tools', component: MasterDataTools },
  { path: '/master-data/tnc', component: MasterDataTnc },
>>>>>>> 7a2a34bba47de2e22a05d9d253ec7484f1468dd7

  { path: '/404', component: Error },

  //TEST
  { path: '/test', component: Test },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

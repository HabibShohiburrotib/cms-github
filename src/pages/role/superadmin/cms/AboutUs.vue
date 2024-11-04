<script setup>
import ButtonBiru from '@/components/ButtonBiru.vue';
import NavbarSA from '@/layout/NavbarSA.vue';
import SidebarSA from '@/layout/SidebarSA.vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue';

const isSidebarVisible = ref(true);
const isEditing = ref(false);
const content = ref(`
<h3>About Us</h3>
<h4>Digitefa: Solusi E-Learning untuk Mengembangkan Karier dan Potensimu</h4>
<p>Digitefa hadir sebagai platform e-learning yang bertujuan untuk membantu berkembang dengan keterampilan yang relevan di dunia industri dan teknologi. Kami percaya bahwa pendidikan berkualitas harus dapat diakses oleh semua orang, sehingga semua bisa mencapai tujuan kariernya dengan lebih percaya diri.</p>
`);
const quill = ref(null);

const updateSidebarVisibility = () => {
    isSidebarVisible.value = window.innerWidth >= 770;
};

const initializeQuillEditor = async () => {
    await nextTick();
    const editor = document.querySelector('#editor');
    if (editor) {
        quill.value = new Quill(editor, {
            modules: {
                toolbar: [
                    [{ 'font': [] }],
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    ['blockquote', 'code-block'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'align': [] }],
                    ['link', 'image', 'video'],
                    ['clean']
                ],
            },
            placeholder: 'Edit content here...',
            theme: 'snow',
        });

        quill.value.root.innerHTML = content.value;
    } else {
        console.error("Editor element not found for Quill initialization.");
    }
};

const saveContent = () => {
    content.value = quill.value.root.innerHTML;
    isEditing.value = false;
};

const toggleEditMode = () => {
    isEditing.value = !isEditing.value;
};

onMounted(() => {
    updateSidebarVisibility();
    window.addEventListener('resize', updateSidebarVisibility);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateSidebarVisibility);
});

watch(isEditing, (newValue) => {
    if (newValue) {
        initializeQuillEditor();
    }
});
</script>

<template>
    <div class="navbg-sa">
        <NavbarSA />
        <SidebarSA v-if="isSidebarVisible" class="sidebar" />
        <div id="contentsa" class="dashboard-sa">
            <div class="container mt-80">
                <div class="row">
                    <div class="col-md-12 mt-4 mt-md-0">
                        <div v-if="!isEditing">
                            <div class="card rounded-3 p-4 border-0">
                                <h5 class="fw-light fs-16">Digitefa/CMS/About Us Content</h5>
                                <h4 class="fs-24">About Us Content</h4>
                                <div class="d-flex justify-content-end">
                                    <ButtonBiru @click="toggleEditMode" class="fs-16 px-3 rounded-3 h-43 mb-3">
                                        <i class="bi bi-pencil-square me-1"></i> Edit About Us
                                    </ButtonBiru>
                                </div>
                                <div class="card bordersa p-4" v-html="content"></div>
                            </div>
                        </div>
                        <div v-else class="card rounded-3 p-4 border-0">
                            <h3 class="fs-24 mb-4">Edit About Us Content</h3>
                            <div id="editor" ref="editor"></div>
                            <div class="d-flex justify-content-end">
<<<<<<< HEAD
                                <ButtonBiru @click="saveContent" class="ms-3 my-3 h-45 px-3 rounded-3 fs-16">
=======
                                <ButtonBiru @click="saveContent" class="ms-3 my-4 h-45 px-3 rounded-3 fs-16">
>>>>>>> 7a2a34bba47de2e22a05d9d253ec7484f1468dd7
                                    Save
                                </ButtonBiru>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { InputText, IftaLabel, Button, ProgressSpinner, Dialog} from 'primevue';
import axios from 'axios';
import { debounce } from 'lodash';

interface PDFOptions {
    body: string,
    header: string,
    footer: string,
    margin: {
        top: string,
        right: string,
        bottom: string,
        left: string
    }
}

const serverUrl = import.meta.env.VITE_REPORT_SERVER_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001');

const options = reactive<PDFOptions>({
    body: `${serverUrl}/#/body`,
    header: `${serverUrl}/#/header`,
    footer: `${serverUrl}/#/footer`,
    margin: {
        top: '3cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm',
    }
});

const pdfUrl = ref('')
const loading = ref(false)

const buildPdf = async (options: PDFOptions) =>{
    try{
        loading.value = true;
        const response = await axios.post(
            `${serverUrl}/api`,
            {
                "body": {
                    "url": options.body,
                },
                "header": {
                    "url": options.header,
                },
                "footer": {
                    "url": options.footer,
                },
                "pageOptions": {
                    "margin": {
                        "left": options.margin.left,
                        "top": options.margin.top,
                        "right": options.margin.right,
                        "bottom": options.margin.bottom
                    }
                }
            },
            {
                responseType: 'blob'
            }
        )
        if([200, 201].includes(response.status)){
            if(pdfUrl.value){
                URL.revokeObjectURL(pdfUrl.value)
            }
            pdfUrl.value = URL.createObjectURL(response.data);
        }
    }catch(e){        
        console.log(e)
    }finally{
        loading.value = false;
    }
}
const debouncedBuildPdf = debounce(buildPdf, 1000);
watch(
    options,
    (values) =>{
        debouncedBuildPdf(values)
    },
    {
        immediate: true,
    }
)
const jsonBodyVisible = ref(false)
const jsonBody = ref('')
const jsonBodyContentEl = ref()
const showJsonBody = (options: PDFOptions) => {
    const value = {
        "body": {
            "url": options.body,
        },
        "header": {
            "url": options.header,
        },
        "footer": {
            "url": options.footer,
        },
        "pageOptions": {
            "margin": {
                "left": options.margin.left,
                "top": options.margin.top,
                "right": options.margin.right,
                "bottom": options.margin.bottom
            }
        }
    };
    jsonBody.value = JSON.stringify(value, undefined, 4);
    jsonBodyVisible.value = true;
}
const handleSelectAll = () => {
    const selection = window.getSelection()
    const selectionRange = document.createRange()
    console.log(jsonBodyContentEl.value)
    selectionRange.selectNodeContents(jsonBodyContentEl.value)
    selection?.removeAllRanges();
    selection?.addRange(selectionRange)
}
const copyJsonBody = async () => {
    await navigator.clipboard.writeText(jsonBody.value);
}
</script>
<template>
    <Dialog v-model:visible="jsonBodyVisible" modal>
        <div class="pb-4 pl-4 pr-4">
            <div class="p-4 json-code" ref="jsonBodyContentEl">
                <pre>{{ jsonBody }}</pre>
            </div>
            <div class="mt-3 flex justify-content-end">
                <Button class="mr-2" @click="handleSelectAll">Select all</Button>
                <Button @click="() => {handleSelectAll(); copyJsonBody();}">Copy</Button>
            </div>
        </div>
    </Dialog>
    <div class="designer">
        <section class="designer__previewer">
            <div v-if="loading" class="flex justify-content-center align-items-center loading">
                <ProgressSpinner />
            </div>
            <iframe v-else-if="pdfUrl != ''" :src="pdfUrl" frameborder="0"></iframe>
        </section>
        <section class="designer-options py-5 px-3">
            <div class="designer-options__content flex flex-wrap">
                <h2 class="mb-4">Options</h2>
                <IftaLabel>
                    <label for="options--body">Body</label>
                    <InputText 
                        id="options--body"
                        v-model="options.body"
                    />
                </IftaLabel>
                <IftaLabel>
                    <label for="options--header">Header</label>
                    <InputText 
                        id="options--header"
                        v-model="options.header"
                    />
                </IftaLabel>
                <IftaLabel>
                    <label for="options--footer">Footer</label>
                    <InputText 
                        id="options--footer"
                        v-model="options.footer"
                    />
                </IftaLabel>
                <IftaLabel class="options--margin">
                    <label for="options--ml">Margin left</label>
                    <InputText 
                        id="options--ml"
                        v-model="options.margin.left"
                    />
                </IftaLabel>
                <IftaLabel class="options--margin">
                    <label for="options--mr">Margin right</label>
                    <InputText 
                    id="options--mr"
                    v-model="options.margin.right"
                    />
                </IftaLabel>
                <IftaLabel class="options--margin">
                    <label for="options--mt">Margin top</label>
                    <InputText 
                        id="options--mt"
                        v-model="options.margin.top"
                    />
                </IftaLabel>
                <IftaLabel class="options--margin">
                    <label for="options--mb">Margin bottom</label>
                    <InputText 
                        id="options--mb"
                        v-model="options.margin.bottom"
                    />
                </IftaLabel>
                <div class="w-full flex">
                    <Button 
                        class="mr-2"
                        @click="() => buildPdf(options)"
                        label="Preview"
                    />
                    <Button 
                        @click="() => showJsonBody(options)"
                        label="Show json"
                    />
                </div>
            </div>
        </section>
    </div>
</template>
<style scoped>
.designer{
    display: flex;
    align-items: stretch;
    width: 100vw;
    height: 100vh;
}
.designer__previewer{
    flex-grow: 1;
}
.designer-options{
    width: 300px;
    overflow-y: auto;
}
.designer-options .p-iftalabel{
    margin-bottom: 20px;
}
.designer-options .options--margin{
    width: calc(50% - 10px);
}
.designer-options .options--margin:nth-child(odd){
    margin-right: 10px;
}
.designer-options .options--margin input{
    width: 100%;
}
.designer__previewer{
    position:relative;
}
.designer__previewer .loading,
.designer__previewer iframe{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.json-code{
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    background-color: #282828;
}
</style>
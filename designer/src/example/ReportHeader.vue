<script lang="ts" setup>
import logoUrl from '../assets/logo.svg';
</script>
<template>
    <header>
        <div class="left flex align-items-center">
            <img :src="logoUrl" alt="Acme Corporation Logo" class="mr-3 header-logo" />
            <div>
                <b>Acme Corporation</b><br>
                <span class="cnpj">CNPJ: 00.000.000/0001-99</span>
            </div>
        </div>
        <div class="right">
            <b>Cliente: </b> Identificação do Cliente
        </div>
    </header>
</template>
<style scoped>
header {
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
header .header-logo {
    height: 36px;
    width: auto;
}
header .cnpj {
    font-size: 0.9em;
    color: #64748b;
}
</style>
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

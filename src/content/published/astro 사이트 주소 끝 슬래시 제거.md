---
kind: note
title: astro 정적사이트 주소 끝 슬래시 제거하기
author: mychatterbox
pubDate: 2024-03-03
slug: trailingSlash-remove
featured: false
draft: false
tags:
    - astro
ogImage: ""
description: cloudflare 로 배포한 astro 사이트 주소 끝 슬래시 제거하기
keywords:
    - trailingSlash
---

cloudflare 로 배포하는 astro 사이트의 주소 끝 슬래시 제거가 잘 안되나요?  
astro.config

```astro
export default defineConfig({
  trailingSlash: "never",
  build: {
    format: 'file',
  },
......
});
```

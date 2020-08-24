# Step Copas

## Requirements

1. [Node.js](https://nodejs.org/en/)
2. Akun [Google](https://google.com/)

## Step-nya

1. Download [Node.js](https://nodejs.org/en/) (Bisa lah ya, kecuali yang download additional tools ga usah)

2. Buat project baru di [Firebase](https://firebase.google.com/)
   ![Step 2](https://i.imgur.com/CT0kTad.png)

3. Kasih nama project lu
   ![Step 3](https://i.imgur.com/Ek89J6R.png)

4. Buat Google Analytics ga usah diceklis, klik selanjutnya
   ![Step 4](https://i.imgur.com/FmJ0KZ3.png)

5. Tungguin...
   ![Step 5](https://i.imgur.com/b4315Ju.png)

6. Klik "Add Web App" (Itu yang bulet ditunjuk)
   ![Step 6](https://i.imgur.com/mx2wvPK.png)

7. Kasih nama,terus ga usah ceklis "Also setup hosting", Klik register
   ![Step 7](https://i.imgur.com/N6jwVdT.png)

8. Skip aja kek gini mah, kecuali lu ngerti (Kalo ngerti ngapain ikutin ini LOL)
   ![Step 8](https://i.imgur.com/q36AhGi.png)

9. Buka Bagian "Storage" (ada di kiri tuh), terus klik Get Started
   ![img](https://i.imgur.com/qlXg7lp.png)

10. Klik Next aja
    ![img](https://i.imgur.com/a7dbzhC.png)

11. Ini juga next aja
    ![img](https://i.imgur.com/hxBMPhh.png)

12. Tungguin... #2
    ![img](https://i.imgur.com/3liwpOU.png)

13. Buka bagian "Database" (di kiri juga)
    ![img](https://i.imgur.com/rj6UCJa.png)

14. Pilih yang mana aja bebas sih, terus klik next
    ![img](https://i.imgur.com/Ct8E3Ow.png)

15. Terus next, ga bisa diapa-apain juga
    ![img](https://i.imgur.com/P4xVyfH.png)

16. Ngerti lah, tungguin aja

17. Buka "Project Settings"
    ![Step 9](https://i.imgur.com/8mCUOQI.png)

18. Scroll ke bawah sampe ketemu nama projek kamu, bagian "Firebase SDK Snippet". Klik yang "Config", terus copy
    ![Step 10](https://i.imgur.com/HuoaJh4.png)

19. Buka projectnya (Bebas pake apa aja), di folder `src/scripts/`, buat file baru bernama `firebaseConfig.ts`, copas yang tadi, lalu kasih 1 line terakhir tuh (Kalo ngerti JS ya bagus)
    ![img](https://i.imgur.com/TzsqwHS.png)

20. Install `firebase-tools` pake npm, buka aja cmd di direktori project kamu, terus ketik command ini (abis itu enter, kalo ga tau keterlaluan)
    ![img](https://i.imgur.com/2l9UaNC.png)

21. Setelah selesai, login pake `firebase login`
    ![img](https://i.imgur.com/KIhCwBT.png)

22. Pastikan kamu ada di direktori project, lalu ketik `npm install` (masih di cmd)
    ![img](https://i.imgur.com/8RynYwy.png)

23. Masuk ke folder functions dengan `cd functions`, lalu jalankan lagi `npm install`
    ![img](https://i.imgur.com/bIPPE0v.png)

24. Setelah selesai, kembali lagi ke direktori utama dengan `cd ..`, lalu jalankan `npm run build`
    ![img](https://i.imgur.com/KYeimlo.png)

25. Jalanin `firebase init` dulu, nanti pilih aja yes yes, terus pilih fitur nya `functions`, `hosting`, `firestore`, `storage`. (Ga ada screenshot, kelupaan)

26. Abis itu jalanin `firebase deploy` (kalo ada error, hapus `.firebaserc` dan `firebase.json`, terus ulangin step No. 25)
    ![img](https://i.imgur.com/YmGMaFr.png)

27. Balik lagi ke firebase console, buka bagian "Authentication", "Sign In Method", lalu klik "E-Mail/Password"
    ![img](https://i.imgur.com/WhHBJIU.png)

28. Klik "Enable" lalu "Save"
    ![img](https://i.imgur.com/OBNlZzx.png)

29. Tambahin user kamu di sini. Klik "Users", terus "Add Users" (ngerti lah dah capek ngetik gua)
    ![img](https://i.imgur.com/rPiaz2b.png)

30. Buka Database lagi, terus masuk ke collection users. Di situ lu bisa lihat users yang tadi lu bikin. Role-nya bisa diganti jadi `guru` / `kurikulum` / `supervisor` / `kepsek`
    ![img](https://i.imgur.com/8kH7eVJ.png)

31. Beres

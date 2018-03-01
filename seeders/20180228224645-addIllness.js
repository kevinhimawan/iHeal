'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Illnesses', [{
      name: 'Tuberkulosis (TBC)',
      description: 'Tuberkulosis adalah penyakit infeksi saluran pernapasan yang disebabkan oleh bakteri basil. Bakteri basil yang menginfeksi adalah bakteri basil yang sangat kuat. Akibtanya, akan membutuhkan waktu yang lama untuk mengobati penyakit ini. Bakteri ini 90% cenderung menginfeksi paru-paru jika dibandingkan dengan organ-organ lainnya pada tubuh manusia. Penyakit ini biasanya ditandai dengan batuk terus menerus.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Tifus',
      description: 'Tifus adalah penyakit infeksi pada usus halus yang disebabkan oleh bakteri salmonella.Biasanya ditandai dengan demam yang suhunya naik secara bertahap hingga membuat pendeita menggigil. Biasanya demam terjadi di malam hari dan mereda, kemudian akan naik lagi di malam berikutnya. Gejala yang lain dapat berupa  sakit kepala, sakit di bagian perut, denyut jantung menurun, sampai kehilangan nafsu makan.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Pneunomia',
      description: 'Pneumonia atau radang paru-paru adalah suatu peradangan yang disebabkan oleh bakteri, virus, maupun parasit lainnya. Peradangan terjadi pada pulmonary alveolus (alveoli) yang seharusnya bertugas untuk menyerap oksigen dari atmosfer. Akan tetapi karena terjadinya peradangan, organ ini menjadi terisi cairan sehinggapenyerapan oksigen terganggu dan menyebabkan sulit bernapas. Gejalanya dmulai dari demam, batuk, hingga mengalami kesulitan bernapas.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Hepatitis',
      description: 'Hepatitis adalah penyakit menularyang menyerang organ hati pada manusia. Disebabkan oleh bakteri serta virus dan tidak bersihnya lingkungan sekitar, sehingga menginfeksi hati dan terjadi peradangan.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Demam Berdarah (DBD)',
      description: 'DBD adalah penyakit menular yang disebabkan oleh virus dengue yang dibawa oleh nyamuk Aedes aegeypti Betina. Gejala yang umum terjadi adalah demam tinggi pada beberapa hari, sakit pada persendian, munculnya bintik-bintik merah, turunnya trombosit secara drastis, dan bisa terjadi pendarahan.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Influenza',
      description: 'Influenza atau yang lebih umum dikenal dengan flu adalah penyakit menular yang paling umum diderita oleh orang-orang. Influenza ini disebabkan oleh virus. Virus influenza adalah virus yang setiap waktunya bermutasi, sehingga sistem imunitas tubuh sulit mendeteksi virus yang satu ini. Karena sulitnya sistem imun tubuh mendeteksi virus influenza ini, maka tubuh cenderung lebih mudah terkena flu. Bahkan tubuh dapat beberapa kali terkena flu dalam waktu yang berdekatan.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Panu',
      description: 'Tidak disangka penyakit kulit yang sering dianggap ringan ini adalah penyakit menular. Panu menjadikan kulit kita memiliki bercak-bercak putih yang kadang terasa gatal.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Flu Burung (H5N1)',
      description: 'Penyakit menular yang disebabkan oleh virus H5N1 pernah jadi perbincangan yang hebat karena efeknya yang dahsyat menelan korban para penderitanya. Virus yang awalnya berasal dari unggas ini dapat menyerang pada manusia. Biasanya pada manusia akan menyerang pada sistem pernapasan dengan gejala awal demam, dan dapat menyebabkan kematian jika tidak ditangani.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Asma',
      description: 'Merupakan gangguan kesehatan yang muncul akibat terjadinya penyempitan saluran nafas karena hiperaktifitas terhadap rangsangan tertentu yang menyebabkan peradangan. Penyempitan ini bersifat sementara. Ditandain dengan gejala : bunyi saat nafas, pilek/bersin-bersin, batuk disertai rasa gatal di tenggorokan, sesak nafas, berkeringat dan denyut nadi meningkat.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Bronkitis',
      description: 'Peradangan yang terjadi di saluran udara ke paru-paru (bronkus), ditandain denganm gejala : batuk berdahak yang tidak kunjung sembuh',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Sakit Gigi (radang gusi)',
      description: 'Lebih banyak terjadi pada orang dewasa, bila tidak ditangani segera dapat menyebabkan gigi lepas. ditandian dengan gejala : gusi nampak merah, bengkak, sakit dan mudah berdarah bila tersentuh, nafas bau, jika sudah parah dapat menyebabkan peradangan pada gusi, bernanah, gigi goyang dan mudah lepas',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Insomnia (susah tidur)',
      description: 'Insomnia adalah kesulitan untuk tidur karena ketidakseimbangan hormon serotonin dan melatonin. Insomnia dikelompokkan menjadi insomnia primer yang sifatnya menahun dan insomnia sekunder , Gejala : Sulit tidur, Penyebab : Stress di rumah atau di pekerjaan dan faktor usia, nyeri, kecemasan, obat, depresi atau stress yang hebat, perubahan pola hidup karena perbedaan waktu ',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};

var alternativeCount = 1;

function appendAlternative() {
  // append 1 row to alternative table
  $('#alternative-table-body').append(
      '<tr id="alternative__no-' + alternativeCount + '">'
        + '<td>'
          + '<input type="text" id="alternative__nama--' + alternativeCount + '" value="Opsi ' + alternativeCount + '">'
        + '</td>'
        + '<td>'
          + '<input type="number" id="alternative__harga--' + alternativeCount + '" value="0">'
        + '</td>'
        + '<td>'
          + '<input type="number" id="alternative__merk--' + alternativeCount + '" value="0">'
        + '</td>'
        + '<td>'
          + '<input type="number" id="alternative__garansi--' + alternativeCount + '" value="0">'
        + '</td>'
        + '<td>'
          + '<input type="number" id="alternative__clock-speed--' + alternativeCount + '" value="0">'
        + '</td>'
        + '<td>'
          + '<input type="number" id="alternative__flops--' + alternativeCount + '" value="0">'
        + '</td>'
        + '<td>'
          + '<input type="number" id="alternative__vram--' + alternativeCount + '" value="0">'
        + '</td>'
        + '<td>'
          + '<input type="number" id="alternative__pixel-rate--' + alternativeCount + '" value="0">'
        + '</td>'
        + '<td>'
          + '<input type="number" id="alternative__texture-rate--' + alternativeCount + '" value="0">'
        + '</td>'
        + '<td>'
          + '<input type="number" id="alternative__bandwidth--' + alternativeCount + '" value="0">'
        + '</td>'
        + '<td>'
          + '<input type="number" id="alternative__directx--'+ alternativeCount + '" value="0">'
        + '</td>'
      + '</tr>'
    );
    alternativeCount++;
}

function popAlternative() {
  // remove one row from alternative table
  if(alternativeCount > 1) {
    $('#alternative__no-' + --alternativeCount).remove();
  }
}

function calculateTOPSIS() {
  // parse input alternatif
  // and calculate normalizing constant for each criteria
  alternatives = [];
  normalizingConstants = {
    'harga': 0,
    'merk': 0,
    'garansi': 0,
    'clock-speed': 0,
    'flops': 0,
    'vram': 0,
    'pixel-rate': 0,
    'texture-rate': 0,
    'bandwidth': 0,
    'directx': 0
  };
  for(var i = 0; i < alternativeCount; i++) {
    curData = {};
    curData['nama'] = $('#alternative__nama--' + i).val();
    curData['harga'] = $('#alternative__harga--' + i).val().length ? parseInt($('#alternative__harga--' + i).val()) : 0;
    curData['merk'] = $('#alternative__merk--' + i).val().length ? parseInt($('#alternative__merk--' + i).val()) : 0;
    curData['garansi'] = $('#alternative__garansi--' + i).val().length ? parseInt($('#alternative__garansi--' + i).val()) : 0;
    curData['clock-speed'] = $('#alternative__clock-speed--' + i).val().length ? parseFloat($('#alternative__clock-speed--' + i).val()) : 0;
    curData['flops'] = $('#alternative__flops--' + i).val().length ? parseFloat($('#alternative__flops--' + i).val()) : 0;
    curData['vram'] = $('#alternative__vram--' + i).val().length ? parseFloat($('#alternative__vram--' + i).val()) : 0;
    curData['pixel-rate'] = $('#alternative__pixel-rate--' + i).val().length ? parseFloat($('#alternative__pixel-rate--' + i).val()) : 0;
    curData['texture-rate'] = $('#alternative__texture-rate--' + i).val().length ? parseFloat($('#alternative__texture-rate--' + i).val()) : 0;
    curData['bandwidth'] = $('#alternative__bandwidth--' + i).val().length ? parseFloat($('#alternative__bandwidth--' + i).val()) : 0;
    curData['directx'] = $('#alternative__directx--' + i).val().length ? parseInt($('#alternative__directx--' + i).val()) : 0;
    alternatives.push(curData);

    normalizingConstants['harga'] += curData['harga'] * curData['harga'];
    normalizingConstants['merk'] += curData['merk'] * curData['merk'];
    normalizingConstants['garansi'] += curData['garansi'] * curData['garansi'];
    normalizingConstants['clock-speed'] += curData['clock-speed'] * curData['clock-speed'] ;
    normalizingConstants['flops'] += curData['flops'] * curData['flops'];
    normalizingConstants['vram'] += curData['vram'] * curData['vram'];
    normalizingConstants['pixel-rate'] += curData['pixel-rate'] * curData['pixel-rate'];
    normalizingConstants['texture-rate'] += curData['texture-rate'] * curData['texture-rate'];
    normalizingConstants['bandwidth'] += curData['bandwidth'] * curData['bandwidth'];
    normalizingConstants['directx'] += curData['directx'] * curData['directx'];
  }
  normalizingConstants['harga'] = Math.sqrt(normalizingConstants['harga']) > 0 ? Math.sqrt(normalizingConstants['harga']) : 1;
  normalizingConstants['merk'] = Math.sqrt(normalizingConstants['merk']) > 0 ? Math.sqrt(normalizingConstants['merk']) : 1;
  normalizingConstants['garansi'] = Math.sqrt(normalizingConstants['garansi']) > 0 ? Math.sqrt(normalizingConstants['garansi']) : 1;
  normalizingConstants['clock-speed'] = Math.sqrt(normalizingConstants['clock-speed']) > 0 ? Math.sqrt(normalizingConstants['clock-speed']) : 1;
  normalizingConstants['flops'] = Math.sqrt(normalizingConstants['flops']) > 0 ? Math.sqrt(normalizingConstants['flops']) : 1;
  normalizingConstants['vram'] = Math.sqrt(normalizingConstants['vram']) > 0 ? Math.sqrt(normalizingConstants['vram']) : 1;
  normalizingConstants['pixel-rate'] = Math.sqrt(normalizingConstants['pixel-rate']) > 0 ? Math.sqrt(normalizingConstants['pixel-rate']) : 1;
  normalizingConstants['texture-rate'] = Math.sqrt(normalizingConstants['texture-rate']) > 0 ? Math.sqrt(normalizingConstants['texture-rate']) : 1;
  normalizingConstants['bandwidth'] = Math.sqrt(normalizingConstants['bandwidth']) > 0 ? Math.sqrt(normalizingConstants['bandwidth']) : 1;
  normalizingConstants['directx'] = Math.sqrt(normalizingConstants['directx']) > 0 ? Math.sqrt(normalizingConstants['directx']) : 1;

  // parse input bobot
  weights = {
    'harga': $('#weight__harga').val().length ? parseInt($('#weight__harga').val()) : 1,
    'merk': $('#weight__merk').val().length ? parseInt($('#weight__merk').val()) : 1,
    'garansi': $('#weight__garansi').val().length ? parseInt($('#weight__garansi').val()) : 1,
    'clock-speed': $('#weight__clock-speed').val().length ? parseInt($('#weight__clock-speed').val()) : 1,
    'flops': $('#weight__flops').val().length ? parseInt($('#weight__flops').val()) : 1,
    'vram': $('#weight__vram').val().length ? parseInt($('#weight__vram').val()) : 1,
    'pixel-rate': $('#weight__pixel-rate').val().length ? parseInt($('#weight__pixel-rate').val()) : 1,
    'texture-rate': $('#weight__texture-rate').val().length ? parseInt($('#weight__texture-rate').val()) : 1,
    'bandwidth': $('#weight__bandwidth').val().length ? parseInt($('#weight__bandwidth').val()) : 1,
    'directx': $('#weight__directx').val().length ? parseInt($('#weight__directx').val()) : 1,
  }
  totalWeights = weights['harga'] + weights['merk'] + weights['garansi']
                + weights['clock-speed'] + weights['flops'] + weights['vram']
                + weights['pixel-rate'] + weights['texture-rate'] + weights['bandwidth']
                + weights['directx']

  // normalize the properties of the alternatives
  for(var i = 0; i < alternativeCount; i++) {
    alternatives[i]['harga'] /= normalizingConstants['harga'];
    alternatives[i]['merk'] /= normalizingConstants['merk'];
    alternatives[i]['garansi'] /= normalizingConstants['garansi'];
    alternatives[i]['clock-speed'] /= normalizingConstants['clock-speed'];
    alternatives[i]['flops'] /= normalizingConstants['flops'];
    alternatives[i]['vram'] /= normalizingConstants['vram'];
    alternatives[i]['pixel-rate'] /= normalizingConstants['pixel-rate'];
    alternatives[i]['texture-rate'] /= normalizingConstants['texture-rate'];
    alternatives[i]['bandwidth'] /= normalizingConstants['bandwidth'];
    alternatives[i]['directx'] /= normalizingConstants['directx'];
  }

  // multiply each normalized criteria by weights
  for(var i = 0; i < alternativeCount; i++) {
    alternatives[i]['harga'] *= weights['harga'] / totalWeights;
    alternatives[i]['merk'] *= weights['merk'] / totalWeights;
    alternatives[i]['garansi'] *= weights['garansi'] / totalWeights;
    alternatives[i]['clock-speed'] *= weights['clock-speed'] / totalWeights;
    alternatives[i]['flops'] *= weights['flops'] / totalWeights;
    alternatives[i]['vram'] *= weights['vram'] / totalWeights;
    alternatives[i]['pixel-rate'] *= weights['pixel-rate'] / totalWeights;
    alternatives[i]['texture-rate'] *= weights['texture-rate'] / totalWeights;
    alternatives[i]['bandwidth'] *= weights['bandwidth'] / totalWeights;
    alternatives[i]['directx'] *= weights['directx'] / totalWeights;
  } 

  // find ideal solution
  positive_ideal = {
    'harga': Number.MAX_SAFE_INTEGER,
    'merk': 0,
    'garansi': 0,
    'clock-speed': 0,
    'flops': 0,
    'vram': 0,
    'pixel-rate': 0,
    'texture-rate': 0,
    'bandwidth': 0,
    'directx': 0
  }
  negative_ideal = {
    'harga': 0,
    'merk': Number.MAX_SAFE_INTEGER,
    'garansi': Number.MAX_SAFE_INTEGER,
    'clock-speed': Number.MAX_SAFE_INTEGER,
    'flops': Number.MAX_SAFE_INTEGER,
    'vram': Number.MAX_SAFE_INTEGER,
    'pixel-rate': Number.MAX_SAFE_INTEGER,
    'texture-rate': Number.MAX_SAFE_INTEGER,
    'bandwidth': Number.MAX_SAFE_INTEGER,
    'directx': Number.MAX_SAFE_INTEGER
  };
  for(var i = 0; i < alternativeCount; i++) {
    if(alternatives[i]['harga'] < positive_ideal['harga']) 
      positive_ideal['harga'] = alternatives[i]['harga'];
    if(alternatives[i]['merk'] > positive_ideal['merk']) 
      positive_ideal['merk'] = alternatives[i]['merk'];
    if(alternatives[i]['garansi'] > positive_ideal['garansi']) 
      positive_ideal['garansi'] = alternatives[i]['garansi'];
    if(alternatives[i]['clock-speed'] > positive_ideal['clock-speed']) 
      positive_ideal['clock-speed'] = alternatives[i]['clock-speed'];
    if(alternatives[i]['flops'] > positive_ideal['flops']) 
      positive_ideal['flops'] = alternatives[i]['flops'];
    if(alternatives[i]['vram'] > positive_ideal['vram']) 
      positive_ideal['vram'] = alternatives[i]['vram'];
    if(alternatives[i]['pixel-rate'] > positive_ideal['pixel-rate']) 
      positive_ideal['pixel-rate'] = alternatives[i]['pixel-rate'];
    if(alternatives[i]['texture-rate'] > positive_ideal['texture-rate']) 
      positive_ideal['texture-rate'] = alternatives[i]['texture-rate'];
    if(alternatives[i]['bandwidth'] > positive_ideal['bandwidth']) 
      positive_ideal['bandwidth'] = alternatives[i]['bandwidth'];
    if(alternatives[i]['directx'] > positive_ideal['directx']) 
      positive_ideal['directx'] = alternatives[i]['directx'];
    
    if(alternatives[i]['harga'] > negative_ideal['harga']) 
      negative_ideal['harga'] = alternatives[i]['harga'];
    if(alternatives[i]['merk'] < negative_ideal['merk']) 
      negative_ideal['merk'] = alternatives[i]['merk'];
    if(alternatives[i]['garansi'] < negative_ideal['garansi']) 
      negative_ideal['garansi'] = alternatives[i]['garansi'];
    if(alternatives[i]['clock-speed'] < negative_ideal['clock-speed']) 
      negative_ideal['clock-speed'] = alternatives[i]['clock-speed'];
    if(alternatives[i]['flops'] < negative_ideal['flops']) 
      negative_ideal['flops'] = alternatives[i]['flops'];
    if(alternatives[i]['vram'] < negative_ideal['vram']) 
      negative_ideal['vram'] = alternatives[i]['vram'];
    if(alternatives[i]['pixel-rate'] < negative_ideal['pixel-rate']) 
      negative_ideal['pixel-rate'] = alternatives[i]['pixel-rate'];
    if(alternatives[i]['texture-rate'] < negative_ideal['texture-rate']) 
      negative_ideal['texture-rate'] = alternatives[i]['texture-rate'];
    if(alternatives[i]['bandwidth'] < negative_ideal['bandwidth']) 
      negative_ideal['bandwidth'] = alternatives[i]['bandwidth'];
    if(alternatives[i]['directx'] < negative_ideal['directx']) 
      negative_ideal['directx'] = alternatives[i]['directx'];
  }

  // calculate euclidean distance for each alternative
  positive_distances = [];
  negative_distances = [];
  for(var i = 0; i < alternativeCount; i++) {
    positive_distances.push(
      Math.sqrt(
        Math.pow(alternatives[i]['harga'] - positive_ideal['harga'], 2)
        + Math.pow(alternatives[i]['merk'] - positive_ideal['merk'], 2) 
        + Math.pow(alternatives[i]['garansi'] - positive_ideal['garansi'], 2) 
        + Math.pow(alternatives[i]['clock-speed'] - positive_ideal['clock-speed'], 2) 
        + Math.pow(alternatives[i]['flops'] - positive_ideal['flops'], 2) 
        + Math.pow(alternatives[i]['vram'] - positive_ideal['vram'], 2) 
        + Math.pow(alternatives[i]['pixel-rate'] - positive_ideal['pixel-rate'], 2) 
        + Math.pow(alternatives[i]['texture-rate'] - positive_ideal['texture-rate'], 2) 
        + Math.pow(alternatives[i]['bandwidth'] - positive_ideal['bandwidth'], 2) 
        + Math.pow(alternatives[i]['directx'] - positive_ideal['directx'], 2) 
      )
    );
    negative_distances.push(
      Math.sqrt(
        Math.pow(alternatives[i]['harga'] - negative_ideal['harga'], 2)
        + Math.pow(alternatives[i]['merk'] - negative_ideal['merk'], 2) 
        + Math.pow(alternatives[i]['garansi'] - negative_ideal['garansi'], 2) 
        + Math.pow(alternatives[i]['clock-speed'] - negative_ideal['clock-speed'], 2) 
        + Math.pow(alternatives[i]['flops'] - negative_ideal['flops'], 2) 
        + Math.pow(alternatives[i]['vram'] - negative_ideal['vram'], 2) 
        + Math.pow(alternatives[i]['pixel-rate'] - negative_ideal['pixel-rate'], 2) 
        + Math.pow(alternatives[i]['texture-rate'] - negative_ideal['texture-rate'], 2) 
        + Math.pow(alternatives[i]['bandwidth'] - negative_ideal['bandwidth'], 2) 
        + Math.pow(alternatives[i]['directx'] - negative_ideal['directx'], 2) 
      )
    );
  }

  // calculate performance value
  performance_values = [];
  for(var i = 0; i < alternativeCount; i++) {
    performance_values.push(negative_distances[i]/(negative_distances[i] + positive_distances[i]));
  }

  // find the maximum solution
  solution_index = performance_values.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1]; // argmax

  // output performance values
  final_solution_html = '<h2>Solusi: ' + alternatives[solution_index]['nama'] + '</h2>'
                        + '<table class="table">'
                          + '<thead>'
                            + '<tr>'
                              + '<th>Alternatif</th>'
                              + '<th>Nilai Preferensi</th>'
                            + '</tr>'
                          + '</thead>'
                          + '<tbody>';
  for(var i = 0; i < alternativeCount; i++) {
    final_solution_html += '<tr><td>' + alternatives[i]['nama']
                            + '</td><td>' + performance_values[i] + '</td></tr>';
  }
  final_solution_html += '</tbody></table>';
  $('#final-solution').html(final_solution_html);
}

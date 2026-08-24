document.addEventListener('DOMContentLoaded', () => {
  const MERCHANDISERS = ['Anjali', 'Ritu', 'Anamika'];
  const STORAGE_KEY = 'dd_clients_v1';
  const INDEX_KEY = 'dd_merch_index_v1';

  const form = document.getElementById('clientForm');
  const nameInput = document.getElementById('clientName');
  const typeInput = document.getElementById('clientType');
  const list = document.getElementById('clientsList');

  function loadClients(){
    try{ return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }catch(e){ return []; }
  }

  function saveClients(clients){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clients));
  }

  function getAndIncrementMerchIndex(){
    const raw = localStorage.getItem(INDEX_KEY);
    let idx = raw ? parseInt(raw,10) : 0;
    const assigned = MERCHANDISERS[idx % MERCHANDISERS.length];
    idx = (idx + 1) % MERCHANDISERS.length;
    localStorage.setItem(INDEX_KEY, String(idx));
    return assigned;
  }

  function render(){
    const clients = loadClients();
    list.innerHTML = '';
    if (clients.length === 0) {
      list.innerHTML = '<p>No clients yet. Add one using the form above.</p>';
      return;
    }

    clients.forEach((c, i) => {
      const card = document.createElement('div');
      card.className = 'client-card';

      const meta = document.createElement('div');
      meta.className = 'client-meta';
      const title = document.createElement('strong');
      title.textContent = c.name + (c.type ? ` • ${c.type}` : '');
      const merch = document.createElement('span');
      merch.innerHTML = `<span class="badge">Merchandiser: ${c.merch}</span>`;
      const status = document.createElement('div');
      status.textContent = c.status === 'completed' ? 'Status: Completed' : 'Status: Active';
      status.style.marginTop = '6px';

      meta.appendChild(title);
      meta.appendChild(merch);
      meta.appendChild(status);

      const actions = document.createElement('div');
      actions.className = 'actions';

      // Mark Completed button
      const doneBtn = document.createElement('button');
      doneBtn.className = 'btn';
      doneBtn.textContent = 'Mark Completed';
      doneBtn.onclick = () => {
        clients[i].status = 'completed';
        clients[i].completedAt = new Date().toISOString();
        saveClients(clients);
        render();
      };

      // Mark Not Needed button -> also marks completed (per requirement)
      const notNeededBtn = document.createElement('button');
      notNeededBtn.className = 'btn';
      notNeededBtn.textContent = 'Mark Not Needed';
      notNeededBtn.onclick = () => {
        clients[i].status = 'completed';
        clients[i].note = 'Marked as not needed';
        clients[i].completedAt = new Date().toISOString();
        saveClients(clients);
        render();
      };

      // Remove button
      const removeBtn = document.createElement('button');
      removeBtn.className = 'btn';
      removeBtn.textContent = 'Remove';
      removeBtn.onclick = () => {
        if (!confirm(`Remove client "${c.name}"?`)) return;
        clients.splice(i,1);
        saveClients(clients);
        render();
      };

      actions.appendChild(doneBtn);
      actions.appendChild(notNeededBtn);
      actions.appendChild(removeBtn);

      // If completed, show timestamp and note
      if (c.status === 'completed'){
        const info = document.createElement('div');
        info.style.fontSize = '12px';
        info.style.marginTop = '6px';
        const when = c.completedAt ? new Date(c.completedAt).toLocaleString() : '';
        info.textContent = (c.note ? c.note + ' • ' : '') + (when ? `Completed: ${when}` : 'Completed');
        meta.appendChild(info);
      }

      card.appendChild(meta);
      card.appendChild(actions);
      list.appendChild(card);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value && nameInput.value.trim();
    const type = typeInput.value || '';
    if (!name) return alert('Please enter a client name');

    const clients = loadClients();
    const merch = getAndIncrementMerchIndex();
    clients.push({ name, type, merch, status: 'active', createdAt: new Date().toISOString() });
    saveClients(clients);
    nameInput.value = '';
    render();
  });

  // initial render
  render();
});

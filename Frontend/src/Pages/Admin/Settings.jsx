import React, { useState } from 'react';
import { Loading, PanelCard, Button, Input } from '../../Components/ui';
import { adminService } from '../../services';
import { showToast } from '../../utils/commonFunctions';

const AdminSettings = () => {
  const [current, setCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const changePassword = async (e) => {
    e.preventDefault();
    if (!current || !password) return showToast('Both fields required', 'error');
    setSaving(true);
    try {
      await adminService.changePassword({ currentPassword: current, newPassword: password });
      showToast('Password updated', 'success');
      setCurrent(''); setPassword('');
    } catch (e) {
      showToast(e.response?.data?.message || 'Failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-white">Settings</h2>
      <PanelCard title="Admin Password">
        <form onSubmit={changePassword} className="max-w-sm space-y-4">
          <Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Current password" />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" />
          <Button type="submit" disabled={saving}>Update Password</Button>
        </form>
        <p className="text-slate-500 text-xs mt-4">School configuration and profile settings will appear here.</p>
      </PanelCard>
    </div>
  );
};

export default AdminSettings;

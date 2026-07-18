import React, { useState } from 'react';
import { PanelCard, Button, Input } from '../../Components/ui';
import { studentService } from '../../services';
import { showToast } from '../../utils/commonFunctions';

const StudentProfile = () => {
  const [current, setCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [saving, setSaving] = useState(false);

  const changePassword = async (e) => {
    e.preventDefault();
    if (!current || !password) return showToast('Both fields required', 'error');
    setSaving(true);
    try {
      await studentService.changePassword({ currentPassword: current, newPassword: password });
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
      <h2 className="text-2xl font-black text-white">My Profile</h2>
      <PanelCard title="Change Password">
        <form onSubmit={changePassword} className="max-w-sm space-y-4">
          <Input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Current password" />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" />
          <Button type="submit" disabled={saving}>Update Password</Button>
        </form>
      </PanelCard>
    </div>
  );
};

export default StudentProfile;

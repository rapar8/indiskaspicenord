import { useState } from 'react';
import {type CSSProperties} from 'react';
import { supabase } from '../supabaseClient';
import FlashMessage from '../components/FlashMessage';

type FormData = {
    name: string;
    email: string;
    group_or_private: string;
    preferred_location: string;
    number_of_sessions: number;
    veg_or_nonveg: string;
    cooking_experience: string;
    interested_cuisines: string[];
    available_days: string[];
    additional_notes: string;
};

export default function CookingInterestForm() {
    const [form, setForm] = useState<FormData>({
        name: '',
        email: '',
        group_or_private: 'private',
        preferred_location: 'myHome',
        number_of_sessions: 1,
        veg_or_nonveg: 'veg',
        cooking_experience: 'beginner',
        interested_cuisines: [],
        available_days: [],
        additional_notes: '',
    });
    const [flash, setFlash] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const toggleArray = (field: keyof FormData, value: string) =>
        setForm((p) => {
            const arr = p[field] as string[];
            const updated = arr.includes(value)
                ? arr.filter((v) => v !== value)
                : [...arr, value];
            return { ...p, [field]: updated };
        });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Insert into Supabase
        const { error: dbError } = await supabase
            .from('cooking_interest')
            .insert([form])
            .select();

        if (dbError) {
            console.error('DB Insert Error:', dbError);
            setFlash('❌ Submission failed. Please try again.');
            return;
        }

        // 2. Send email via EmailJS (only on success)
        try {
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    service_id: 'service_d089o2b',
                    template_id: 'template_lh4bwej',
                    user_id: 'EKbjQG-tsdqNsyc3X',
                    template_params: {
                        to_name: form.name,
                        to_email: form.email,
                        email: form.email,
                        num_sessions: form.number_of_sessions.toString(),
                    },
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`EmailJS failed: ${response.status} - ${errorText}`);
            }

            setFlash('✅ Thanks! We have your interest & sent a confirmation.');
            setForm({
                name: '',
                email: '',
                group_or_private: 'private',
                preferred_location: '',
                number_of_sessions: 1,
                veg_or_nonveg: 'veg',
                cooking_experience: 'beginner',
                interested_cuisines: [],
                available_days: [],
                additional_notes: '',
            });
        } catch (err) {
            console.error('EmailJS Error:', err);
            setFlash('⚠️ Saved, but failed to send confirmation email.');
        }
    };

    const sectionStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Arial, sans-serif'
    } as const;

    const labelStyle: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        fontWeight: 500
    };

    const checkboxGroupStyle: CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginTop: '0.5rem'
    };

    return (
        <>
            {flash && <FlashMessage message={flash} onClose={() => setFlash(null)} />}
            <form onSubmit={handleSubmit} style={sectionStyle}>
                <h2 style={{textAlign: 'center'}}>🍳 Cooking Interest Form</h2>

                <label style={labelStyle}>
                    Name:
                    <input name="name" value={form.name} onChange={handleChange} required/>
                </label>

                <label style={labelStyle}>
                    Email:
                    <input name="email" type="email" value={form.email} onChange={handleChange} required/>
                </label>

                <label style={labelStyle}>
                    Group or Private:
                    <select name="group_or_private" value={form.group_or_private} onChange={handleChange}>
                        <option value="group">Group</option>
                        <option value="private">Private</option>
                    </select>
                </label>

                {form.group_or_private === 'private' && (
                    <label style={labelStyle}>
                        Preferred Location:
                        <select name="preferred_location" value={form.preferred_location} onChange={handleChange}>
                            <option value="myHome">My Home</option>
                            <option value="company">Arrange by Company</option>
                        </select>
                    </label>
                )}

                <label style={labelStyle}>
                    Number of Sessions:(2-3 hours per session)
                    <input
                        name="number_of_sessions"
                        type="number"
                        value={form.number_of_sessions}
                        onChange={handleChange}
                        min={1}
                        max={10}
                    />
                </label>

                <label style={labelStyle}>
                    Veg or Non-Veg:
                    <select name="veg_or_nonveg" value={form.veg_or_nonveg} onChange={handleChange}>
                        <option value="veg">Veg</option>
                        <option value="nonveg">Non-Veg</option>
                        <option value="both">Both</option>
                    </select>
                </label>

                <label style={labelStyle}>
                    Cooking Experience:
                    <select name="cooking_experience" value={form.cooking_experience} onChange={handleChange}>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </label>

                <div>
                    <label style={labelStyle}>Interested Cuisines:</label>
                    <div style={checkboxGroupStyle}>
                        {['Indian', 'South Indian', 'Snacks', 'Fusion'].map(cuisine => (
                            <label key={cuisine}>
                                <input
                                    type="checkbox"
                                    checked={form.interested_cuisines.includes(cuisine)}
                                    onChange={() => toggleArray('interested_cuisines', cuisine)}
                                />
                                {cuisine}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label style={labelStyle}>Available Days:</label>
                    <div style={checkboxGroupStyle}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                            <label key={day}>
                                <input
                                    type="checkbox"
                                    checked={form.available_days.includes(day)}
                                    onChange={() => toggleArray('available_days', day)}
                                />
                                {day}
                            </label>
                        ))}
                    </div>
                </div>

                <label style={labelStyle}>
                    Additional Notes:
                    <textarea
                        name="additional_notes"
                        value={form.additional_notes}
                        onChange={handleChange}
                        rows={3}
                    />
                </label>

                <button type="submit" style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    backgroundColor: '#0066cc',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}>
                    Submit
                </button>
            </form>
        </>
    );
}
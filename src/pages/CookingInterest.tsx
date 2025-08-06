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
        gap: '1.5rem',
        maxWidth: '600px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        fontFamily: 'Lato, sans-serif'
    } as const;

    const labelStyle: CSSProperties = {
        position: 'absolute',
        top: '-8px',
        left: '12px',
        backgroundColor: '#f9f9f9',
        padding: '0 8px',
        fontSize: '14px',
        fontWeight: 500,
        color: '#005776',
        zIndex: 1
    };

    const checkboxGroupStyle: CSSProperties = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginTop: '0.5rem'
    };
    const labelStyleCookingInterested: CSSProperties =
        {margin: '0 0 1rem 0', color: '#005776', textAlign: 'left'};

    const inputStyle: CSSProperties = {
        width: '100%',
        padding: '12px 16px',
        border: '2px solid #005776',
        borderRadius: '8px',
        fontSize: '16px',
        backgroundColor: 'white',
        outline: 'none',
        transition: 'border-color 0.3s ease',
        boxSizing: 'border-box'
    };

    const selectStyle: CSSProperties = {
        ...inputStyle,
        cursor: 'pointer'
    };

    const textareaStyle: CSSProperties = {
        ...inputStyle,
        resize: 'vertical',
        minHeight: '80px'
    };

    const fieldContainerStyle: CSSProperties = {
        position: 'relative',
        marginBottom: '0.5rem'
    };

    const checkboxLabelStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem',
        border: '1px solid #ddd',
        borderRadius: '4px',
        backgroundColor: 'white',
        cursor: 'pointer',
        fontSize: '14px'
    };



    return (
        <>
            {flash && <FlashMessage message={flash} onClose={() => setFlash(null)} />}
            <div style={sectionStyle}>
                <h2 style={{textAlign: 'center', color: '#005776', marginBottom: '2rem'}}>🍳 Intresseformulär för matlagning</h2>

                <div style={fieldContainerStyle}>
                    <span style={labelStyle}>Namn</span>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={fieldContainerStyle}>
                    <span style={labelStyle}>E-post</span>
                    <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                <div style={fieldContainerStyle}>
                    <span style={labelStyle}>Grupp eller privat</span>
                    <select
                        name="group_or_private"
                        value={form.group_or_private}
                        onChange={handleChange}
                        style={selectStyle}
                    >
                        <option value="group">Group</option>
                        <option value="private">Private</option>
                    </select>
                </div>

                {form.group_or_private === 'private' && (
                    <div style={fieldContainerStyle}>
                        <span style={labelStyle}>Föredragen plats</span>
                        <select
                            name="preferred_location"
                            value={form.preferred_location}
                            onChange={handleChange}
                            style={selectStyle}
                        >
                            <option value="myHome">Mitt hem</option>
                            <option value="company">Ordna efter företag</option>
                        </select>
                    </div>
                )}

                <div style={fieldContainerStyle}>
                    <span style={labelStyle}>Antal sessioner (2–3 timmar per session)</span>
                    <input
                        name="number_of_sessions"
                        type="number"
                        value={form.number_of_sessions}
                        onChange={handleChange}
                        min={1}
                        max={10}
                        style={inputStyle}
                    />
                </div>

                <div style={fieldContainerStyle}>
                    <span style={labelStyle}>Veg or Non-Veg</span>
                    <select
                        name="veg_or_nonveg"
                        value={form.veg_or_nonveg}
                        onChange={handleChange}
                        style={selectStyle}
                    >
                        <option value="veg">Veg</option>
                        <option value="nonveg">Non-Veg</option>
                        <option value="both">Both</option>
                    </select>
                </div>

                <div style={fieldContainerStyle}>
                    <span style={labelStyle}>Cooking Experience</span>
                    <select
                        name="cooking_experience"
                        value={form.cooking_experience}
                        onChange={handleChange}
                        style={selectStyle}
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>

                <div>
                    <h4 style={labelStyleCookingInterested}>Intresserade rätter:</h4>
                    <div style={checkboxGroupStyle}>
                        {['Snabbt recept', 'Curry', 'Snacks'].map(cuisine => (
                            <label key={cuisine} style={checkboxLabelStyle}>
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
                    <h4 style={labelStyleCookingInterested}>Tillgängliga dagar:</h4>
                    <div style={checkboxGroupStyle}>
                        {['Vardagar', 'Helgen'].map(day => (
                            <label key={day} style={checkboxLabelStyle}>
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

                <div style={fieldContainerStyle}>
                    <span style={labelStyle}>Ytterligare information</span>
                    <textarea
                        name="additional_notes"
                        value={form.additional_notes}
                        onChange={handleChange}
                        rows={3}
                        style={textareaStyle}
                    />
                </div>

                <button type="button" onClick={handleSubmit} style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '1rem',
                    backgroundColor: '#005776',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    marginTop: '1rem',
                    transition: 'background-color 0.3s ease'
                }}>
                    Överlämnat
                </button>
            </div>
        </>
    );
}
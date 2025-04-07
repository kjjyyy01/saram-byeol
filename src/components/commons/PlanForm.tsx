"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import{Form } from"@/components/ui/form"

const PlanForm = () => {
  return (
    <Form>
      <div>
        <Label htmlFor='title'>제목</Label>
        <Input type='text' id='title' placeholder='제목' />
      </div>
      <div>
        <Label htmlFor='dateInput'>날짜</Label>
        <Input id='dateInput' />
      </div>
      <div>
        <Label htmlFor='contacts'>내사람</Label>
        <Input id='contacts' />
      </div>
      <div>
        <Label htmlFor='detail'>내용</Label>
        <Textarea id='detail' />
      </div>
    </Form>
  );
};

export default PlanForm;

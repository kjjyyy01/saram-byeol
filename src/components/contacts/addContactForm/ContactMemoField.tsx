// components/contacts/ContactMemoField.tsx
import React from 'react'
import { FormField, FormControl, FormMessage } from '@/components/ui/form'
import { TextAlignLeft } from '@phosphor-icons/react'
import type { Control } from 'react-hook-form'
import { ContactFormValues } from '@/lib/schemas/contactFormSchema'
import { Textarea } from '@/components/ui/textarea'

type ContactMemoFieldProps = {
  control: Control<ContactFormValues>
}

export const ContactMemoField = ({ control }: ContactMemoFieldProps) => (
  <FormField
    control={control}
    name="memo"
    render={({ field, fieldState }) => (
      <div className="flex w-full items-start">
        {/* 아이콘 + 라벨 */}
        <div className="w-24 flex flex-col items-center pt-1">
          <TextAlignLeft size={24} className="mb-1 text-gray-600" />
          <div className="text-sm">메모</div>
        </div>

        {/* textarea */}
        <div className="flex-1 flex flex-col">
          <FormControl>
            <Textarea
              {...field}
              rows={5}
              maxLength={80}
              placeholder="최대 80글자 까지 입력 가능합니다."
              className="resize-none"
            />
          </FormControl>
          <div className="mt-1 min-h-[24px]">
            {fieldState.error && (
              <FormMessage className="text-left text-sm text-red-500">
                {fieldState.error.message}
              </FormMessage>
            )}
          </div>
        </div>
      </div>
    )}
  />
)

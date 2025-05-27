import { useForm } from "react-hook-form"

// Types
import { UseFormReturn } from "react-hook-form"
import { UpdateInspectorFormUseForm, UseUpdateInspectorFormUseFormProps } from "./types"

export const useUpdateInspectorForm = (inspector: UseUpdateInspectorFormUseFormProps['inspector']): UseFormReturn<UpdateInspectorFormUseForm> => { // UpdateInspectorForm useForm
  
  return useForm<UpdateInspectorFormUseForm>({
    defaultValues: {
      name: inspector.name,
      email: inspector.email,
      inspectorId: inspector.inspectorId,
      uuid: inspector.uuid
    }
  })
}
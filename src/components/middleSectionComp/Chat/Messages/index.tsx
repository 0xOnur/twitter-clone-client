import SelectChatMessage from './SelectChatMessage'
import SelectedConversation from './Selected';

interface IProps {
  conversationId?: string;
}

const Messages = ({conversationId}: IProps) => {
console.log("🚀 ~ file: index.tsx:9 ~ Messages ~ conversationId:", conversationId)

  if(conversationId) {
    return (
      <SelectedConversation conversationId={conversationId} />
    )
  }

  return (
    <div className='h-full overflow-hidden'>
      <SelectChatMessage/>
    </div>
  )
}

export default Messages
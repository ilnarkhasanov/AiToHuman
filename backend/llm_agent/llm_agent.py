from typing import Sequence
from uuid import uuid4
from langchain_core.language_models import LanguageModelLike
from langchain_core.tools import BaseTool
from langgraph.prebuilt import create_react_agent
from langchain_core.runnables import RunnableConfig
import gigachat.exceptions


class LLMAgent:
    def __init__(self, model: LanguageModelLike, tools: Sequence[BaseTool]) -> None:
        self.model = model
        self.agent = create_react_agent(
            model,
            tools,
        )
        self.thread_id = uuid4().hex
        self.config: RunnableConfig = {
                "configurable": {"thread_id": self.thread_id}}
    
    def _invoke(self, messages: list[dict[str, str]], temperature: float=0.3) -> str:
        return self.agent.invoke(
            {
                "messages": messages,
                "temperature": temperature,
            },
            config=self.config,
        )["messages"][-1].content
    
    def invoke(self, system_prompt: str, content: str, temperature: float=0.3) -> str:
        try:
            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": content},
            ]

            return self._invoke(messages)
        except gigachat.exceptions.ResponseError:
            messages = [
                {"role": "user", "content": content},
            ]

            return self._invoke(messages)

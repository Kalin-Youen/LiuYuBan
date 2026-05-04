#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
多级智能体协作系统 · 核心工具
L2/L3/L4 跨 Trae IDE 会话通信
"""

import os
import sys
import json
from datetime import datetime
from typing import Dict, List, Optional, Any

# 协作目录
COLLAB_DIR = ".collaboration"
QUEUE_DIR = os.path.join(COLLAB_DIR, "queue")
CONTEXT_DIR = os.path.join(COLLAB_DIR, "context")
OUTPUT_DIR = os.path.join(COLLAB_DIR, "output")

# 状态定义
STATUS_PENDING = "pending"
STATUS_EXECUTING = "executing"
STATUS_PENDING_REVIEW = "pending_review"
STATUS_PENDING_DECISION = "pending_decision"
STATUS_COMPLETED = "completed"

def init_collab() -> None:
    """初始化协作系统"""
    for d in [COLLAB_DIR, QUEUE_DIR, CONTEXT_DIR, OUTPUT_DIR]:
        os.makedirs(d, exist_ok=True)
    print(f"[OK] 协作系统已初始化: {COLLAB_DIR}")

def create_task(
    level: str,
    task_type: str,
    input_files: List[str],
    prompt: str,
    priority: str = "medium"
) -> str:
    """创建新任务"""
    task_id = f"TASK_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
    task = {
        "id": task_id,
        "level": level,
        "task_type": task_type,
        "status": STATUS_PENDING,
        "input": {
            "files": input_files,
            "prompt": prompt
        },
        "priority": priority,
        "created_at": datetime.now().isoformat()
    }
    task_file = os.path.join(QUEUE_DIR, f"{task_id}.json")
    with open(task_file, "w", encoding="utf-8") as f:
        json.dump(task, f, indent=2, ensure_ascii=False)
    print(f"[OK] 任务已创建: {task_id}")
    return task_id

def list_tasks(status_filter: Optional[str] = None) -> List[Dict]:
    """列出所有任务"""
    tasks = []
    if not os.path.exists(QUEUE_DIR):
        return tasks
    for filename in os.listdir(QUEUE_DIR):
        if filename.endswith(".json"):
            with open(os.path.join(QUEUE_DIR, filename), encoding="utf-8") as f:
                task = json.load(f)
                if status_filter is None or task["status"] == status_filter:
                    tasks.append(task)
    tasks.sort(key=lambda x: x["created_at"], reverse=True)
    return tasks

def update_task_status(task_id: str, new_status: str) -> bool:
    """更新任务状态"""
    task_file = os.path.join(QUEUE_DIR, f"{task_id}.json")
    if not os.path.exists(task_file):
        print(f"[ERROR] 任务不存在: {task_id}")
        return False
    with open(task_file, encoding="utf-8") as f:
        task = json.load(f)
    task["status"] = new_status
    task["updated_at"] = datetime.now().isoformat()
    with open(task_file, "w", encoding="utf-8") as f:
        json.dump(task, f, indent=2, ensure_ascii=False)
    print(f"[OK] 任务状态已更新: {task_id} -> {new_status}")
    return True

def write_output(
    task_id: str,
    output_files: List[str],
    summary: str,
    uncertainties: List[str],
    risks: List[str],
    needs_review: bool = True
) -> None:
    """写入输出"""
    output = {
        "task_id": task_id,
        "status": STATUS_PENDING_REVIEW,
        "output_files": output_files,
        "summary": summary,
        "uncertainties": uncertainties,
        "risks": risks,
        "needs_review": needs_review,
        "created_at": datetime.now().isoformat()
    }
    output_file = os.path.join(OUTPUT_DIR, f"output_{task_id}.json")
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    print(f"[OK] 输出已写入: {output_file}")

def write_review(
    task_id: str,
    review_comment: str,
    approved: bool,
    needs_decision: bool = True
) -> None:
    """写入复核意见"""
    output_file = os.path.join(OUTPUT_DIR, f"output_{task_id}.json")
    if not os.path.exists(output_file):
        print(f"[ERROR] 输出不存在: {task_id}")
        return
    with open(output_file, encoding="utf-8") as f:
        output = json.load(f)
    output["review"] = {
        "comment": review_comment,
        "approved": approved,
        "needs_decision": needs_decision,
        "reviewed_at": datetime.now().isoformat()
    }
    output["status"] = STATUS_PENDING_DECISION
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    update_task_status(task_id, STATUS_PENDING_DECISION)
    print(f"[OK] 复核意见已写入")

def write_decision(
    task_id: str,
    decision_comment: str,
    approved: bool,
    write_back: bool,
    write_back_location: Optional[str] = None
) -> None:
    """写入最终裁定"""
    output_file = os.path.join(OUTPUT_DIR, f"output_{task_id}.json")
    if not os.path.exists(output_file):
        print(f"[ERROR] 输出不存在: {task_id}")
        return
    with open(output_file, encoding="utf-8") as f:
        output = json.load(f)
    output["decision"] = {
        "comment": decision_comment,
        "approved": approved,
        "write_back": write_back,
        "write_back_location": write_back_location,
        "decided_at": datetime.now().isoformat()
    }
    output["status"] = STATUS_COMPLETED
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)
    update_task_status(task_id, STATUS_COMPLETED)
    print(f"[OK] 最终裁定已写入")

def print_task_summary(task: Dict) -> None:
    """打印任务摘要"""
    print(f"\n--- 任务 ID: {task['id']} ---")
    print(f"级别: {task['level']}")
    print(f"类型: {task['task_type']}")
    print(f"状态: {task['status']}")
    print(f"优先级: {task['priority']}")
    print(f"创建: {task['created_at']}")

def print_output_summary(output: Dict) -> None:
    """打印输出摘要"""
    print(f"\n--- 输出摘要: {output['task_id']} ---")
    print(f"状态: {output['status']}")
    print(f"输出文件: {output['output_files']}")
    print(f"摘要: {output['summary']}")
    if output.get('review'):
        print(f"复核: {'[APPROVED]' if output['review']['approved'] else '[REJECTED]'}")
    if output.get('decision'):
        print(f"裁定: {'[APPROVED]' if output['decision']['approved'] else '[REJECTED]'}")

def main():
    import argparse

    parser = argparse.ArgumentParser(description="多级智能体协作系统")
    subparsers = parser.add_subparsers(title="命令")

    # 初始化
    init_parser = subparsers.add_parser("init", help="初始化协作系统")
    init_parser.set_defaults(func=lambda _: init_collab())

    # 创建任务
    create_parser = subparsers.add_parser("create", help="创建新任务")
    create_parser.add_argument("level", choices=["L2", "L3", "L4"], help="级别")
    create_parser.add_argument("type", help="任务类型")
    create_parser.add_argument("-f", "--files", nargs="+", help="输入文件")
    create_parser.add_argument("-p", "--prompt", required=True, help="任务提示词")
    create_parser.add_argument("--priority", default="medium", choices=["low", "medium", "high"], help="优先级")

    def create_task_cmd(args):
        create_task(args.level, args.type, args.files or [], args.prompt, args.priority)

    create_parser.set_defaults(func=create_task_cmd)

    # 列出任务
    list_parser = subparsers.add_parser("list", help="列出任务")
    list_parser.add_argument("-s", "--status", help="状态过滤")

    def list_tasks_cmd(args):
        tasks = list_tasks(args.status)
        if not tasks:
            print("没有任务")
            return
        for task in tasks:
            print_task_summary(task)

    list_parser.set_defaults(func=list_tasks_cmd)

    # 更新状态
    update_parser = subparsers.add_parser("update", help="更新任务状态")
    update_parser.add_argument("id", help="任务ID")
    update_parser.add_argument("status", help="新状态")

    def update_task_cmd(args):
        update_task_status(args.id, args.status)

    update_parser.set_defaults(func=update_task_cmd)

    args = parser.parse_args()
    if hasattr(args, "func"):
        args.func(args)
    else:
        parser.print_help()

if __name__ == "__main__":
    main()

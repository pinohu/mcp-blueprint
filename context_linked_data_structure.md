# Context-Linked Data Structure for Service Business Automation

## Overview

This document defines a comprehensive data structure design that supports the Model Context Protocol (MCP) architecture for service business automation. The design focuses on creating a structured, relational database schema that aligns with the context schema and supports the automation workflows previously defined.

## Design Principles

1. **Context Alignment**: Tables and fields directly map to MCP context elements
2. **Relationship Clarity**: Clear definition of relationships between entities
3. **Query Optimization**: Structure optimized for common automation queries
4. **Extensibility**: Design allows for industry-specific extensions
5. **Auditability**: Built-in tracking of data changes and history
6. **Performance**: Balanced between normalization and query efficiency

## Core Data Structure

### Client Management Tables

#### 1. Clients

```
Table: clients
Primary Key: client_id (UUID)

Fields:
- client_id: UUID (PK)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
- status: ENUM ['active', 'inactive', 'pending', 'archived']
- source: VARCHAR(50) [how client was acquired]
- acquisition_date: DATE
- client_type: ENUM ['individual', 'business', 'organization']
- industry: VARCHAR(100) [for business clients]
- lifecycle_stage: VARCHAR(50)
- assigned_account_manager: UUID [staff_id reference]
- tags: JSON [array of tags for flexible categorization]
```

#### 2. Client Profiles

```
Table: client_profiles
Primary Key: profile_id (UUID)
Foreign Key: client_id (UUID) -> clients.client_id

Fields:
- profile_id: UUID (PK)
- client_id: UUID (FK)
- first_name: VARCHAR(100)
- last_name: VARCHAR(100)
- company_name: VARCHAR(200) [for business clients]
- email: VARCHAR(255)
- phone: VARCHAR(50)
- alternate_phone: VARCHAR(50)
- date_of_birth: DATE
- profile_image_url: VARCHAR(255)
- notes: TEXT
- preferred_language: VARCHAR(50)
- timezone: VARCHAR(50)
```

#### 3. Client Addresses

```
Table: client_addresses
Primary Key: address_id (UUID)
Foreign Key: client_id (UUID) -> clients.client_id

Fields:
- address_id: UUID (PK)
- client_id: UUID (FK)
- address_type: ENUM ['billing', 'service', 'mailing', 'other']
- is_primary: BOOLEAN
- street_address1: VARCHAR(255)
- street_address2: VARCHAR(255)
- city: VARCHAR(100)
- state_province: VARCHAR(100)
- postal_code: VARCHAR(20)
- country: VARCHAR(100)
- latitude: DECIMAL(10,8) [for service routing]
- longitude: DECIMAL(11,8) [for service routing]
- special_instructions: TEXT
```

#### 4. Client Preferences

```
Table: client_preferences
Primary Key: preference_id (UUID)
Foreign Key: client_id (UUID) -> clients.client_id

Fields:
- preference_id: UUID (PK)
- client_id: UUID (FK)
- category: VARCHAR(50) ['communication', 'scheduling', 'service', 'billing']
- preference_key: VARCHAR(100)
- preference_value: TEXT
- updated_at: TIMESTAMP
```

#### 5. Client Segments

```
Table: client_segments
Primary Key: segment_id (UUID)

Fields:
- segment_id: UUID (PK)
- segment_name: VARCHAR(100)
- description: TEXT
- criteria: JSON [segment definition rules]
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
- is_active: BOOLEAN
```

#### 6. Client Segment Memberships

```
Table: client_segment_memberships
Primary Key: membership_id (UUID)
Foreign Keys: 
  - client_id (UUID) -> clients.client_id
  - segment_id (UUID) -> client_segments.segment_id

Fields:
- membership_id: UUID (PK)
- client_id: UUID (FK)
- segment_id: UUID (FK)
- added_at: TIMESTAMP
- score: DECIMAL(5,2) [segment fit score]
- is_primary: BOOLEAN
```

### Service Management Tables

#### 7. Service Catalog

```
Table: service_catalog
Primary Key: service_id (UUID)

Fields:
- service_id: UUID (PK)
- service_name: VARCHAR(200)
- service_code: VARCHAR(50)
- category: VARCHAR(100)
- description: TEXT
- duration_minutes: INTEGER
- is_active: BOOLEAN
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
- requires_qualification: BOOLEAN
- is_recurring: BOOLEAN
- recurrence_pattern: JSON [for recurring services]
```

#### 8. Service Variations

```
Table: service_variations
Primary Key: variation_id (UUID)
Foreign Key: service_id (UUID) -> service_catalog.service_id

Fields:
- variation_id: UUID (PK)
- service_id: UUID (FK)
- variation_name: VARCHAR(200)
- description: TEXT
- duration_adjustment_minutes: INTEGER [+/- from base service]
- is_active: BOOLEAN
```

#### 9. Service Requirements

```
Table: service_requirements
Primary Key: requirement_id (UUID)
Foreign Key: service_id (UUID) -> service_catalog.service_id

Fields:
- requirement_id: UUID (PK)
- service_id: UUID (FK)
- requirement_type: ENUM ['staff', 'equipment', 'facility', 'preparation', 'client']
- requirement_name: VARCHAR(200)
- description: TEXT
- is_mandatory: BOOLEAN
- quantity_needed: INTEGER
```

#### 10. Service Pricing

```
Table: service_pricing
Primary Key: pricing_id (UUID)
Foreign Keys:
  - service_id (UUID) -> service_catalog.service_id
  - variation_id (UUID) -> service_variations.variation_id [optional]

Fields:
- pricing_id: UUID (PK)
- service_id: UUID (FK)
- variation_id: UUID (FK, nullable)
- price_type: ENUM ['fixed', 'hourly', 'variable', 'quote']
- base_price: DECIMAL(10,2)
- currency: VARCHAR(3)
- tax_rate: DECIMAL(5,2)
- is_taxable: BOOLEAN
- effective_date: DATE
- expiration_date: DATE [nullable]
- segment_id: UUID [nullable, for segment-specific pricing]
```

#### 11. Service Delivery Steps

```
Table: service_delivery_steps
Primary Key: step_id (UUID)
Foreign Key: service_id (UUID) -> service_catalog.service_id

Fields:
- step_id: UUID (PK)
- service_id: UUID (FK)
- step_number: INTEGER
- step_name: VARCHAR(200)
- description: TEXT
- estimated_duration_minutes: INTEGER
- is_mandatory: BOOLEAN
- requires_verification: BOOLEAN
- verification_type: VARCHAR(100)
```

### Scheduling Tables

#### 12. Resources

```
Table: resources
Primary Key: resource_id (UUID)

Fields:
- resource_id: UUID (PK)
- resource_type: ENUM ['staff', 'equipment', 'facility', 'vehicle']
- resource_name: VARCHAR(200)
- description: TEXT
- status: ENUM ['available', 'unavailable', 'maintenance', 'retired']
- capacity: INTEGER [for resources with capacity limits]
- capabilities: JSON [array of capability tags]
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### 13. Staff Resources

```
Table: staff_resources
Primary Key: staff_id (UUID)
Foreign Key: resource_id (UUID) -> resources.resource_id

Fields:
- staff_id: UUID (PK)
- resource_id: UUID (FK)
- first_name: VARCHAR(100)
- last_name: VARCHAR(100)
- email: VARCHAR(255)
- phone: VARCHAR(50)
- role: VARCHAR(100)
- qualifications: JSON [array of qualification tags]
- hire_date: DATE
- employment_status: VARCHAR(50)
- max_weekly_hours: INTEGER
- hourly_cost: DECIMAL(10,2)
```

#### 14. Resource Availability

```
Table: resource_availability
Primary Key: availability_id (UUID)
Foreign Key: resource_id (UUID) -> resources.resource_id

Fields:
- availability_id: UUID (PK)
- resource_id: UUID (FK)
- day_of_week: INTEGER [0-6, 0=Sunday]
- start_time: TIME
- end_time: TIME
- is_recurring: BOOLEAN
- recurrence_pattern: VARCHAR(50) [e.g., 'weekly', 'biweekly']
- effective_date: DATE
- expiration_date: DATE [nullable]
```

#### 15. Resource Unavailability

```
Table: resource_unavailability
Primary Key: unavailability_id (UUID)
Foreign Key: resource_id (UUID) -> resources.resource_id

Fields:
- unavailability_id: UUID (PK)
- resource_id: UUID (FK)
- start_datetime: TIMESTAMP
- end_datetime: TIMESTAMP
- reason: VARCHAR(200)
- is_all_day: BOOLEAN
- created_at: TIMESTAMP
- notes: TEXT
```

#### 16. Appointments

```
Table: appointments
Primary Key: appointment_id (UUID)
Foreign Keys:
  - client_id (UUID) -> clients.client_id
  - service_id (UUID) -> service_catalog.service_id

Fields:
- appointment_id: UUID (PK)
- client_id: UUID (FK)
- service_id: UUID (FK)
- variation_id: UUID [nullable, reference to service_variations]
- status: ENUM ['scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show']
- start_datetime: TIMESTAMP
- end_datetime: TIMESTAMP
- duration_minutes: INTEGER
- location_type: ENUM ['client_location', 'business_location', 'remote']
- address_id: UUID [nullable, reference to client_addresses]
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
- created_by: UUID [staff who created appointment]
- notes: TEXT
- is_recurring: BOOLEAN
- recurrence_pattern: JSON [for recurring appointments]
- parent_appointment_id: UUID [nullable, for recurring series]
```

#### 17. Appointment Resources

```
Table: appointment_resources
Primary Key: assignment_id (UUID)
Foreign Keys:
  - appointment_id (UUID) -> appointments.appointment_id
  - resource_id (UUID) -> resources.resource_id

Fields:
- assignment_id: UUID (PK)
- appointment_id: UUID (FK)
- resource_id: UUID (FK)
- role: VARCHAR(100) [role in this specific appointment]
- is_primary: BOOLEAN
- assigned_at: TIMESTAMP
- assigned_by: UUID [staff who made assignment]
- status: ENUM ['assigned', 'confirmed', 'declined', 'completed']
```

#### 18. Appointment Reminders

```
Table: appointment_reminders
Primary Key: reminder_id (UUID)
Foreign Key: appointment_id (UUID) -> appointments.appointment_id

Fields:
- reminder_id: UUID (PK)
- appointment_id: UUID (FK)
- reminder_type: ENUM ['email', 'sms', 'push', 'phone']
- scheduled_datetime: TIMESTAMP
- status: ENUM ['pending', 'sent', 'failed']
- sent_datetime: TIMESTAMP [nullable]
- template_id: VARCHAR(100) [reference to message template]
- custom_message: TEXT [nullable]
```

### Service Delivery Tables

#### 19. Service Deliveries

```
Table: service_deliveries
Primary Key: delivery_id (UUID)
Foreign Keys:
  - appointment_id (UUID) -> appointments.appointment_id
  - client_id (UUID) -> clients.client_id
  - service_id (UUID) -> service_catalog.service_id

Fields:
- delivery_id: UUID (PK)
- appointment_id: UUID (FK)
- client_id: UUID (FK)
- service_id: UUID (FK)
- status: ENUM ['pending', 'in_progress', 'completed', 'cancelled', 'rescheduled']
- actual_start_datetime: TIMESTAMP
- actual_end_datetime: TIMESTAMP
- actual_duration_minutes: INTEGER
- completed_by: UUID [staff who completed service]
- completion_notes: TEXT
- follow_up_required: BOOLEAN
- follow_up_type: VARCHAR(100)
- follow_up_date: DATE [nullable]
```

#### 20. Service Delivery Checklist

```
Table: service_delivery_checklist
Primary Key: checklist_item_id (UUID)
Foreign Key: delivery_id (UUID) -> service_deliveries.delivery_id

Fields:
- checklist_item_id: UUID (PK)
- delivery_id: UUID (FK)
- item_name: VARCHAR(200)
- description: TEXT
- is_completed: BOOLEAN
- completed_at: TIMESTAMP [nullable]
- completed_by: UUID [nullable]
- is_mandatory: BOOLEAN
- sequence_number: INTEGER
- category: VARCHAR(100)
```

#### 21. Service Delivery Steps Execution

```
Table: service_delivery_step_execution
Primary Key: execution_id (UUID)
Foreign Keys:
  - delivery_id (UUID) -> service_deliveries.delivery_id
  - step_id (UUID) -> service_delivery_steps.step_id

Fields:
- execution_id: UUID (PK)
- delivery_id: UUID (FK)
- step_id: UUID (FK)
- status: ENUM ['pending', 'in_progress', 'completed', 'skipped']
- start_datetime: TIMESTAMP [nullable]
- end_datetime: TIMESTAMP [nullable]
- executed_by: UUID [staff who executed step]
- execution_notes: TEXT
- outcome: TEXT
- issues_encountered: TEXT
```

#### 22. Service Delivery Issues

```
Table: service_delivery_issues
Primary Key: issue_id (UUID)
Foreign Key: delivery_id (UUID) -> service_deliveries.delivery_id

Fields:
- issue_id: UUID (PK)
- delivery_id: UUID (FK)
- issue_type: VARCHAR(100)
- severity: ENUM ['low', 'medium', 'high', 'critical']
- description: TEXT
- reported_at: TIMESTAMP
- reported_by: UUID [staff who reported issue]
- status: ENUM ['open', 'in_progress', 'resolved', 'closed']
- resolution: TEXT
- resolved_at: TIMESTAMP [nullable]
- resolved_by: UUID [nullable]
```

#### 23. Service Delivery Outcomes

```
Table: service_delivery_outcomes
Primary Key: outcome_id (UUID)
Foreign Key: delivery_id (UUID) -> service_deliveries.delivery_id

Fields:
- outcome_id: UUID (PK)
- delivery_id: UUID (FK)
- outcome_type: VARCHAR(100)
- description: TEXT
- metrics: JSON [key performance metrics]
- created_at: TIMESTAMP
- created_by: UUID [staff who recorded outcome]
```

### Feedback and Communication Tables

#### 24. Client Interactions

```
Table: client_interactions
Primary Key: interaction_id (UUID)
Foreign Key: client_id (UUID) -> clients.client_id

Fields:
- interaction_id: UUID (PK)
- client_id: UUID (FK)
- interaction_type: ENUM ['email', 'call', 'sms', 'in_person', 'web', 'app']
- direction: ENUM ['inbound', 'outbound']
- subject: VARCHAR(255)
- content: TEXT
- interaction_datetime: TIMESTAMP
- staff_id: UUID [staff involved in interaction]
- related_entity_type: VARCHAR(50) [e.g., 'appointment', 'invoice', 'feedback']
- related_entity_id: UUID [reference to related entity]
- tags: JSON [array of tags]
- sentiment: VARCHAR(50) [e.g., 'positive', 'neutral', 'negative']
```

#### 25. Feedback Responses

```
Table: feedback_responses
Primary Key: feedback_id (UUID)
Foreign Keys:
  - client_id (UUID) -> clients.client_id
  - delivery_id (UUID) -> service_deliveries.delivery_id [nullable]

Fields:
- feedback_id: UUID (PK)
- client_id: UUID (FK)
- delivery_id: UUID (FK, nullable)
- feedback_type: VARCHAR(100)
- collection_method: VARCHAR(100)
- submitted_at: TIMESTAMP
- overall_rating: INTEGER [e.g., 1-5 scale]
- comments: TEXT
- staff_rating: INTEGER [nullable]
- service_rating: INTEGER [nullable]
- value_rating: INTEGER [nullable]
- would_recommend: BOOLEAN [nullable]
- sentiment_analysis: JSON [automated analysis results]
- follow_up_required: BOOLEAN
- follow_up_status: VARCHAR(50)
```

#### 26. Feedback Questions

```
Table: feedback_questions
Primary Key: question_id (UUID)

Fields:
- question_id: UUID (PK)
- question_text: TEXT
- question_type: ENUM ['rating', 'boolean', 'text', 'multiple_choice']
- options: JSON [for multiple choice questions]
- is_required: BOOLEAN
- sequence: INTEGER
- category: VARCHAR(100)
- is_active: BOOLEAN
```

#### 27. Feedback Question Responses

```
Table: feedback_question_responses
Primary Key: response_id (UUID)
Foreign Keys:
  - feedback_id (UUID) -> feedback_responses.feedback_id
  - question_id (UUID) -> feedback_questions.question_id

Fields:
- response_id: UUID (PK)
- feedback_id: UUID (FK)
- question_id: UUID (FK)
- rating_value: INTEGER [nullable]
- boolean_value: BOOLEAN [nullable]
- text_value: TEXT [nullable]
- selected_option: VARCHAR(255) [nullable]
```

### Financial Tables

#### 28. Invoices

```
Table: invoices
Primary Key: invoice_id (UUID)
Foreign Key: client_id (UUID) -> clients.client_id

Fields:
- invoice_id: UUID (PK)
- client_id: UUID (FK)
- invoice_number: VARCHAR(50)
- status: ENUM ['draft', 'sent', 'partial', 'paid', 'overdue', 'cancelled', 'void']
- issue_date: DATE
- due_date: DATE
- amount: DECIMAL(10,2)
- tax_amount: DECIMAL(10,2)
- discount_amount: DECIMAL(10,2)
- total_amount: DECIMAL(10,2)
- balance_due: DECIMAL(10,2)
- currency: VARCHAR(3)
- notes: TEXT
- terms: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
- payment_terms: VARCHAR(100) [e.g., 'net 30']
```

#### 29. Invoice Items

```
Table: invoice_items
Primary Key: item_id (UUID)
Foreign Keys:
  - invoice_id (UUID) -> invoices.invoice_id
  - service_id (UUID) -> service_catalog.service_id [nullable]
  - delivery_id (UUID) -> service_deliveries.delivery_id [nullable]

Fields:
- item_id: UUID (PK)
- invoice_id: UUID (FK)
- service_id: UUID (FK, nullable)
- delivery_id: UUID (FK, nullable)
- description: TEXT
- quantity: DECIMAL(10,2)
- unit_price: DECIMAL(10,2)
- discount_percentage: DECIMAL(5,2)
- tax_percentage: DECIMAL(5,2)
- amount: DECIMAL(10,2)
- tax_amount: DECIMAL(10,2)
- total_amount: DECIMAL(10,2)
- item_type: VARCHAR(50) [e.g., 'service', 'product', 'fee', 'discount']
- date_provided: DATE
```

#### 30. Payments

```
Table: payments
Primary Key: payment_id (UUID)
Foreign Keys:
  - client_id (UUID) -> clients.client_id
  - invoice_id (UUID) -> invoices.invoice_id [nullable]

Fields:
- payment_id: UUID (PK)
- client_id: UUID (FK)
- invoice_id: UUID (FK, nullable)
- payment_date: DATE
- amount: DECIMAL(10,2)
- payment_method: VARCHAR(100)
- reference_number: VARCHAR(100)
- status: ENUM ['pending', 'completed', 'failed', 'refunded', 'voided']
- processor_id: VARCHAR(255) [payment processor reference]
- notes: TEXT
- created_at: TIMESTAMP
- created_by: UUID [staff who recorded payment]
```

#### 31. Subscriptions

```
Table: subscriptions
Primary Key: subscription_id (UUID)
Foreign Key: client_id (UUID) -> clients.client_id

Fields:
- subscription_id: UUID (PK)
- client_id: UUID (FK)
- plan_name: VARCHAR(200)
- status: ENUM ['active', 'paused', 'cancelled', 'expired', 'trial']
- start_date: DATE
- end_date: DATE [nullable]
- billing_cycle: VARCHAR(50) [e.g., 'monthly', 'quarterly', 'annual']
- billing_day: INTEGER
- amount: DECIMAL(10,2)
- currency: VARCHAR(3)
- auto_renew: BOOLEAN
- next_billing_date: DATE
- cancellation_date: DATE [nullable]
- cancellation_reason: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

#### 32. Subscription Items

```
Table: subscription_items
Primary Key: item_id (UUID)
Foreign Keys:
  - subscription_id (UUID) -> subscriptions.subscription_id
  - service_id (UUID) -> service_catalog.service_id

Fields:
- item_id: UUID (PK)
- subscription_id: UUID (FK)
- service_id: UUID (FK)
- quantity: INTEGER
- unit_price: DECIMAL(10,2)
- discount_percentage: DECIMAL(5,2)
- total_price: DECIMAL(10,2)
- billing_frequency: VARCHAR(50)
- usage_limit: INTEGER [nullable]
- current_usage: INTEGER
```

### Analytics Tables

#### 33. Metrics

```
Table: metrics
Primary Key: metric_id (UUID)

Fields:
- metric_id: UUID (PK)
- metric_name: VARCHAR(200)
- category: VARCHAR(100)
- description: TEXT
- unit: VARCHAR(50)
- calculation_method: TEXT
- is_active: BOOLEAN
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
- display_format: VARCHAR(50)
- target_value: DECIMAL(15,5) [nullable]
- warning_threshold: DECIMAL(15,5) [nullable]
- critical_threshold: DECIMAL(15,5) [nullable]
```

#### 34. Metric Values

```
Table: metric_values
Primary Key: value_id (UUID)
Foreign Key: metric_id (UUID) -> metrics.metric_id

Fields:
- value_id: UUID (PK)
- metric_id: UUID (FK)
- value: DECIMAL(15,5)
- timestamp: TIMESTAMP
- period_type: VARCHAR(50) [e.g., 'daily', 'weekly', 'monthly']
- period_start: TIMESTAMP
- period_end: TIMESTAMP
- entity_type: VARCHAR(50) [e.g., 'client', 'service', 'staff']
- entity_id: UUID [nullable, reference to entity]
- notes: TEXT
```

#### 35. Insights

```
Table: insights
Primary Key: insight_id (UUID)

Fields:
- insight_id: UUID (PK)
- insight_type: VARCHAR(100)
- title: VARCHAR(255)
- description: TEXT
- discovery_date: TIMESTAMP
- severity: VARCHAR(50)
- impact_score: DECIMAL(5,2)
- confidence_score: DECIMAL(5,2)
- status: ENUM ['new', 'reviewed', 'actioned', 'dismissed']
- source: VARCHAR(100)
- related_metrics: JSON [array of metric_ids]
- recommended_actions: JSON
- assigned_to: UUID [nullable, staff assigned to insight]
- resolution_notes: TEXT
```

#### 36. Reports

```
Table: reports
Primary Key: report_id (UUID)

Fields:
- report_id: UUID (PK)
- report_name: VARCHAR(200)
- description: TEXT
- report_type: VARCHAR(100)
- parameters: JSON
- created_at: TIMESTAMP
- created_by: UUID [staff who created report]
- last_run: TIMESTAMP
- schedule: JSON [scheduling information]
- recipients: JSON [array of recipient information]
- format: VARCHAR(50) [e.g., 'pdf', 'csv', 'dashboard']
- is_active: BOOLEAN
```

### Agent Context Tables

#### 37. Agent States

```
Table: agent_states
Primary Key: state_id (UUID)
Foreign Key: agent_id (UUID) -> agents.agent_id

Fields:
- state_id: UUID (PK)
- agent_id: UUID (FK)
- state_name: VARCHAR(100)
- state_data: JSON
- current_task: VARCHAR(255)
- last_updated: TIMESTAMP
- status: VARCHAR(50)
- memory_usage: INTEGER [in KB]
- performance_metrics: JSON
```

#### 38. Agents

```
Table: agents
Primary Key: agent_id (UUID)

Fields:
- agent_id: UUID (PK)
- agent_name: VARCHAR(200)
- agent_type: VARCHAR(100)
- description: TEXT
- capabilities: JSON [array of capability descriptions]
- status: ENUM ['active', 'inactive', 'maintenance']
- version: VARCHAR(50)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
- configuration: JSON
- access_patterns: JSON [context access permissions]
```

#### 39. Agent Logs

```
Table: agent_logs
Primary Key: log_id (UUID)
Foreign Key: agent_id (UUID) -> agents.agent_id

Fields:
- log_id: UUID (PK)
- agent_id: UUID (FK)
- timestamp: TIMESTAMP
- log_level: VARCHAR(20) [e.g., 'info', 'warning', 'error']
- message: TEXT
- context: JSON
- entity_type: VARCHAR(50) [e.g., 'client', 'appointment', 'service']
- entity_id: UUID [nullable]
- execution_time_ms: INTEGER
- memory_used_kb: INTEGER
```

#### 40. Agent Tasks

```
Table: agent_tasks
Primary Key: task_id (UUID)
Foreign Key: agent_id (UUID) -> agents.agent_id

Fields:
- task_id: UUID (PK)
- agent_id: UUID (FK)
- task_type: VARCHAR(100)
- status: ENUM ['pending', 'in_progress', 'completed', 'failed', 'cancelled']
- priority: INTEGER
- created_at: TIMESTAMP
- started_at: TIMESTAMP [nullable]
- completed_at: TIMESTAMP [nullable]
- parameters: JSON
- result: JSON
- error_message: TEXT
- retry_count: INTEGER
- parent_task_id: UUID [nullable, for subtasks]
```

### System Tables

#### 41. System Configuration

```
Table: system_configuration
Primary Key: config_id (UUID)

Fields:
- config_id: UUID (PK)
- config_key: VARCHAR(200)
- config_value: TEXT
- data_type: VARCHAR(50)
- description: TEXT
- is_encrypted: BOOLEAN
- category: VARCHAR(100)
- updated_at: TIMESTAMP
- updated_by: UUID [staff who updated config]
```

#### 42. Audit Logs

```
Table: audit_logs
Primary Key: log_id (UUID)

Fields:
- log_id: UUID (PK)
- timestamp: TIMESTAMP
- actor_type: VARCHAR(50) [e.g., 'staff', 'client', 'agent', 'system']
- actor_id: UUID
- action: VARCHAR(100)
- entity_type: VARCHAR(100)
- entity_id: UUID
- previous_state: JSON [nullable]
- new_state: JSON [nullable]
- ip_address: VARCHAR(45)
- user_agent: VARCHAR(255)
- notes: TEXT
```

## Industry-Specific Extensions

### Healthcare Services Extension

```
Table: healthcare_client_profiles
Primary Key: profile_id (UUID)
Foreign Key: client_id (UUID) -> clients.client_id

Fields:
- profile_id: UUID (PK)
- client_id: UUID (FK)
- medical_record_number: VARCHAR(100)
- primary_physician: VARCHAR(200)
- insurance_provider: VARCHAR(200)
- insurance_policy_number: VARCHAR(100)
- insurance_group_number: VARCHAR(100)
- insurance_verification_date: DATE
- allergies: JSON [array of allergies]
- medications: JSON [array of medications]
- medical_conditions: JSON [array of conditions]
- emergency_contact_name: VARCHAR(200)
- emergency_contact_phone: VARCHAR(50)
- emergency_contact_relationship: VARCHAR(100)
```

### Home Services Extension

```
Table: property_profiles
Primary Key: property_id (UUID)
Foreign Key: client_id (UUID) -> clients.client_id

Fields:
- property_id: UUID (PK)
- client_id: UUID (FK)
- address_id: UUID [reference to client_addresses]
- property_type: VARCHAR(100)
- square_footage: INTEGER
- year_built: INTEGER
- number_of_bedrooms: INTEGER
- number_of_bathrooms: DECIMAL(3,1)
- has_basement: BOOLEAN
- has_garage: BOOLEAN
- garage_size: VARCHAR(50)
- heating_system_type: VARCHAR(100)
- cooling_system_type: VARCHAR(100)
- water_heater_type: VARCHAR(100)
- special_instructions: TEXT
- access_code: VARCHAR(50)
- alarm_code: VARCHAR(50)
- pets: JSON [information about pets]
```

### Professional Services Extension

```
Table: projects
Primary Key: project_id (UUID)
Foreign Key: client_id (UUID) -> clients.client_id

Fields:
- project_id: UUID (PK)
- client_id: UUID (FK)
- project_name: VARCHAR(200)
- description: TEXT
- status: ENUM ['planning', 'in_progress', 'on_hold', 'completed', 'cancelled']
- start_date: DATE
- target_completion_date: DATE
- actual_completion_date: DATE [nullable]
- budget: DECIMAL(12,2)
- actual_cost: DECIMAL(12,2)
- project_manager: UUID [staff_id reference]
- priority: VARCHAR(50)
- risk_level: VARCHAR(50)
- stakeholders: JSON [array of stakeholder information]
- milestones: JSON [array of project milestones]
```

## Data Relationships Diagram

```
[Clients] 1──┐
             │
             ├──n [Client Profiles]
             │
             ├──n [Client Addresses]
             │
             ├──n [Client Preferences]
             │
             ├──n [Client Segment Memberships] n──1 [Client Segments]
             │
             ├──n [Appointments] n──1 [Service Catalog]
             │                   │
             │                   ├──n [Appointment Resources] n──1 [Resources]
             │                   │
             │                   └──n [Appointment Reminders]
             │
             ├──n [Service Deliveries] 1──1 [Appointments]
             │                         │
             │                         ├──n [Service Delivery Checklist]
             │                         │
             │                         ├──n [Service Delivery Step Execution] n──1 [Service Delivery Steps]
             │                         │
             │                         ├──n [Service Delivery Issues]
             │                         │
             │                         └──n [Service Delivery Outcomes]
             │
             ├──n [Client Interactions]
             │
             ├──n [Feedback Responses] n──n [Feedback Question Responses] n──1 [Feedback Questions]
             │
             ├──n [Invoices] 1──n [Invoice Items]
             │              │
             │              └──n [Payments]
             │
             └──n [Subscriptions] 1──n [Subscription Items]

[Service Catalog] 1──┐
                     ├──n [Service Variations]
                     │
                     ├──n [Service Requirements]
                     │
                     ├──n [Service Pricing]
                     │
                     └──n [Service Delivery Steps]

[Resources] 1──┐
               ├──1 [Staff Resources]
               │
               ├──n [Resource Availability]
               │
               └──n [Resource Unavailability]

[Metrics] 1──n [Metric Values]

[Agents] 1──┐
            ├──n [Agent States]
            │
            ├──n [Agent Logs]
            │
            └──n [Agent Tasks]
```

## Implementation Guidelines

### Database Selection

1. **Relational Database**:
   - PostgreSQL: Recommended for complex queries and JSON support
   - MySQL/MariaDB: Good alternative with solid performance
   - SQL Server: Suitable for Microsoft-centric environments

2. **NoSQL Options** (for specific components):
   - MongoDB: For flexible schema components (e.g., agent states, metrics)
   - Redis: For caching and real-time components

### Implementation Approach

1. **Phased Implementation**:
   - Start with core client and service tables
   - Add scheduling and delivery tables
   - Implement financial tables
   - Add analytics and agent tables last

2. **Data Migration Strategy**:
   - Create mapping from existing systems
   - Implement validation rules for imported data
   - Maintain dual operation during transition
   - Verify data integrity post-migration

3. **Performance Optimization**:
   - Create appropriate indexes on frequently queried fields
   - Implement partitioning for large tables (e.g., interactions, logs)
   - Set up archiving strategy for historical data
   - Configure caching for frequently accessed data

### Integration with MCP Architecture

1. **Context Mapping**:
   - Map database tables to MCP context elements
   - Implement data access patterns aligned with agent permissions
   - Create views for common context queries
   - Implement change tracking for context updates

2. **Agent Integration**:
   - Create database access layer for agents
   - Implement transaction management for multi-table operations
   - Set up monitoring for agent database interactions
   - Configure connection pooling for efficient resource use

3. **Workflow Support**:
   - Create stored procedures for common workflow operations
   - Implement database triggers for event generation
   - Set up notification mechanisms for workflow transitions
   - Create reporting views for workflow analytics

## Industry-Specific Adaptations

### Healthcare Services

1. **Additional Tables**:
   - Medical history records
   - Treatment plans
   - Insurance verification logs
   - HIPAA compliance tracking

2. **Data Security Enhancements**:
   - Field-level encryption for PHI
   - Enhanced audit logging
   - Access control based on role and relationship
   - Data retention policies aligned with regulations

### Home Services

1. **Additional Tables**:
   - Equipment inventory
   - Maintenance schedules
   - Service territories
   - Route optimization data

2. **Specialized Fields**:
   - Geolocation data for service routing
   - Property-specific service history
   - Seasonal service scheduling
   - Parts and materials tracking

### Professional Services

1. **Additional Tables**:
   - Project deliverables
   - Time tracking
   - Resource allocation
   - Document management

2. **Specialized Fields**:
   - Project phase tracking
   - Milestone completion metrics
   - Stakeholder communication logs
   - Approval workflows

## Aitable Implementation Example

For implementation in Aitable (one of your AppSumo tools), here's a simplified version focusing on the core tables:

### Aitable Base Structure

**Base 1: Client Management**
- Table: Clients
- Table: Client Profiles
- Table: Client Addresses
- Table: Client Preferences
- Table: Client Segments
- Table: Client Segment Memberships

**Base 2: Service Management**
- Table: Service Catalog
- Table: Service Variations
- Table: Service Requirements
- Table: Service Pricing
- Table: Service Delivery Steps

**Base 3: Scheduling**
- Table: Resources
- Table: Staff Resources
- Table: Resource Availability
- Table: Appointments
- Table: Appointment Resources

**Base 4: Service Delivery**
- Table: Service Deliveries
- Table: Service Delivery Checklist
- Table: Service Delivery Step Execution
- Table: Service Delivery Issues

**Base 5: Feedback and Communication**
- Table: Client Interactions
- Table: Feedback Responses
- Table: Feedback Questions

**Base 6: Financial Management**
- Table: Invoices
- Table: Invoice Items
- Table: Payments
- Table: Subscriptions

**Base 7: Analytics and Agents**
- Table: Metrics
- Table: Metric Values
- Table: Insights
- Table: Agents
- Table: Agent Tasks

### Aitable Views Example

**Client Management Views:**
- All Clients
- Active Clients
- Clients by Segment
- Clients by Service History
- Clients Needing Follow-up

**Scheduling Views:**
- Today's Appointments
- Upcoming Appointments
- Appointments by Staff
- Unassigned Appointments
- Appointment Calendar

**Service Delivery Views:**
- In-Progress Services
- Completed Services
- Services with Issues
- Follow-up Required
- Service Performance

**Financial Views:**
- Outstanding Invoices
- Recent Payments
- Revenue by Service
- Subscription Renewals
- Financial Performance

## Next Steps

1. **Schema Validation**:
   - Review schema with stakeholders
   - Validate against workflow requirements
   - Test with sample data
   - Refine based on feedback

2. **Implementation Planning**:
   - Select database platform
   - Create implementation timeline
   - Assign resources
   - Develop testing strategy

3. **Integration Design**:
   - Design API layer for agent access
   - Create integration points with existing systems
   - Develop data synchronization strategy
   - Plan for backup and recovery

4. **Performance Testing**:
   - Develop load testing scenarios
   - Benchmark query performance
   - Identify optimization opportunities
   - Establish performance baselines

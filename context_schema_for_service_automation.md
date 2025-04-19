# Context Schema for Service Business Automation

## Overview

This document provides a detailed context schema design for service business automation using the Model Context Protocol (MCP) architecture. The schema is designed to be comprehensive, flexible, and adaptable to various service industries while maintaining a consistent structure for agent operations.

## Schema Design Principles

1. **Hierarchical Organization**: Context is organized in a logical hierarchy for easy navigation
2. **Atomic Data Units**: Data is broken down into atomic units for granular access and updates
3. **Temporal Awareness**: All data includes temporal metadata for historical tracking
4. **Relational Structure**: Relationships between context elements are explicitly defined
5. **Extensibility**: Schema allows for custom extensions without breaking core functionality

## Complete Context Schema

```json
{
  "ClientContext": {
    "profiles": {
      "client_id": {
        "basic_info": {
          "name": {
            "first": "string",
            "last": "string",
            "preferred": "string"
          },
          "contact": {
            "email": {
              "primary": "string",
              "secondary": "string",
              "verified": "boolean",
              "last_verified": "datetime"
            },
            "phone": {
              "primary": "string",
              "secondary": "string",
              "verified": "boolean",
              "last_verified": "datetime"
            },
            "address": {
              "street": "string",
              "city": "string",
              "state": "string",
              "postal_code": "string",
              "country": "string",
              "verified": "boolean",
              "last_verified": "datetime"
            }
          },
          "demographics": {
            "birth_date": "date",
            "gender": "string",
            "language": "string",
            "occupation": "string",
            "custom_fields": "object"
          },
          "metadata": {
            "created_at": "datetime",
            "created_by": "string",
            "updated_at": "datetime",
            "updated_by": "string",
            "source": "string"
          }
        },
        "preferences": {
          "communication": {
            "preferred_channel": "string",
            "preferred_time": {
              "day_of_week": ["string"],
              "time_of_day": "string"
            },
            "frequency": "string",
            "opt_ins": {
              "marketing": "boolean",
              "notifications": "boolean",
              "feedback_requests": "boolean"
            },
            "last_updated": "datetime"
          },
          "service": {
            "preferred_resources": ["string"],
            "special_requirements": ["string"],
            "service_customizations": "object",
            "last_updated": "datetime"
          },
          "scheduling": {
            "preferred_days": ["string"],
            "preferred_times": ["string"],
            "advance_notice": "string",
            "flexibility": "string",
            "last_updated": "datetime"
          },
          "payment": {
            "preferred_method": "string",
            "auto_pay": "boolean",
            "billing_cycle": "string",
            "last_updated": "datetime"
          },
          "custom_preferences": "object"
        },
        "relationship": {
          "status": {
            "current": "string",
            "since": "datetime",
            "history": [
              {
                "status": "string",
                "from": "datetime",
                "to": "datetime",
                "reason": "string"
              }
            ]
          },
          "metrics": {
            "lifetime_value": {
              "value": "number",
              "last_updated": "datetime"
            },
            "retention_risk": {
              "score": "number",
              "factors": ["string"],
              "last_updated": "datetime"
            },
            "satisfaction": {
              "score": "number",
              "trend": "string",
              "last_updated": "datetime"
            },
            "engagement": {
              "score": "number",
              "trend": "string",
              "last_updated": "datetime"
            }
          },
          "milestones": [
            {
              "type": "string",
              "date": "datetime",
              "description": "string",
              "acknowledged": "boolean"
            }
          ],
          "notes": [
            {
              "content": "string",
              "created_at": "datetime",
              "created_by": "string",
              "tags": ["string"]
            }
          ]
        },
        "segments": {
          "current": ["string"],
          "history": [
            {
              "segment": "string",
              "from": "datetime",
              "to": "datetime",
              "reason": "string"
            }
          ],
          "custom_attributes": "object"
        },
        "custom_fields": "object"
      }
    },
    "interactions": {
      "interaction_id": {
        "client_id": "string",
        "type": {
          "category": "string",
          "subcategory": "string"
        },
        "channel": {
          "medium": "string",
          "details": "object"
        },
        "direction": "string",
        "metadata": {
          "timestamp": "datetime",
          "duration": "number",
          "initiated_by": "string",
          "handled_by": "string"
        },
        "content": {
          "summary": "string",
          "full_text": "string",
          "attachments": ["object"],
          "tags": ["string"]
        },
        "analysis": {
          "sentiment": {
            "score": "number",
            "confidence": "number",
            "aspects": "object"
          },
          "intent": {
            "primary": "string",
            "secondary": ["string"],
            "confidence": "number"
          },
          "topics": ["string"],
          "entities": ["object"]
        },
        "outcome": {
          "resolution": "string",
          "next_steps": ["string"],
          "follow_up_required": "boolean",
          "follow_up_details": "object"
        },
        "related": {
          "previous_interaction": "string",
          "next_interaction": "string",
          "related_interactions": ["string"],
          "related_services": ["string"]
        },
        "custom_fields": "object"
      }
    },
    "households": {
      "household_id": {
        "name": "string",
        "members": [
          {
            "client_id": "string",
            "relationship": "string",
            "is_primary": "boolean"
          }
        ],
        "address": "object",
        "created_at": "datetime",
        "updated_at": "datetime",
        "custom_fields": "object"
      }
    }
  },
  "ServiceContext": {
    "catalog": {
      "service_id": {
        "basic_info": {
          "name": "string",
          "description": "string",
          "category": "string",
          "subcategory": "string",
          "tags": ["string"],
          "created_at": "datetime",
          "updated_at": "datetime"
        },
        "delivery": {
          "duration": {
            "minimum": "number",
            "typical": "number",
            "maximum": "number",
            "unit": "string"
          },
          "format": "string",
          "location_type": "string",
          "steps": [
            {
              "name": "string",
              "description": "string",
              "duration": "number",
              "required": "boolean",
              "resources": ["string"]
            }
          ],
          "checklist": [
            {
              "item": "string",
              "category": "string",
              "required": "boolean"
            }
          ]
        },
        "resources": {
          "staff": {
            "skills_required": ["string"],
            "certifications_required": ["string"],
            "min_staff": "number",
            "optimal_staff": "number"
          },
          "equipment": ["string"],
          "materials": ["string"],
          "facilities": ["string"],
          "custom_resources": "object"
        },
        "pricing": {
          "base_price": "number",
          "variable_factors": [
            {
              "factor": "string",
              "impact": "object"
            }
          ],
          "discounts": [
            {
              "type": "string",
              "value": "object",
              "conditions": "object"
            }
          ],
          "tax_category": "string",
          "custom_pricing": "object"
        },
        "availability": {
          "active": "boolean",
          "seasonal": "boolean",
          "seasons": [
            {
              "start_date": "string",
              "end_date": "string",
              "modifications": "object"
            }
          ],
          "restrictions": "object"
        },
        "quality": {
          "standards": [
            {
              "name": "string",
              "description": "string",
              "measurement": "string",
              "threshold": "object"
            }
          ],
          "metrics": [
            {
              "name": "string",
              "description": "string",
              "calculation": "string",
              "target": "object"
            }
          ]
        },
        "custom_fields": "object"
      }
    },
    "delivery": {
      "delivery_id": {
        "basic_info": {
          "client_id": "string",
          "service_id": "string",
          "appointment_id": "string",
          "created_at": "datetime",
          "updated_at": "datetime"
        },
        "scheduling": {
          "scheduled_start": "datetime",
          "scheduled_end": "datetime",
          "actual_start": "datetime",
          "actual_end": "datetime",
          "duration": "number",
          "timezone": "string"
        },
        "status": {
          "current": "string",
          "history": [
            {
              "status": "string",
              "timestamp": "datetime",
              "updated_by": "string",
              "reason": "string"
            }
          ],
          "percent_complete": "number",
          "estimated_completion": "datetime"
        },
        "resources": {
          "assigned": [
            {
              "resource_id": "string",
              "type": "string",
              "role": "string",
              "status": "string"
            }
          ],
          "utilization": "object",
          "issues": [
            {
              "resource_id": "string",
              "issue": "string",
              "impact": "string",
              "resolution": "string"
            }
          ]
        },
        "execution": {
          "steps": [
            {
              "name": "string",
              "status": "string",
              "start_time": "datetime",
              "end_time": "datetime",
              "notes": "string"
            }
          ],
          "checklist": [
            {
              "item": "string",
              "status": "string",
              "checked_at": "datetime",
              "checked_by": "string",
              "notes": "string"
            }
          ],
          "issues": [
            {
              "description": "string",
              "severity": "string",
              "identified_at": "datetime",
              "identified_by": "string",
              "resolution": "string",
              "resolved_at": "datetime"
            }
          ],
          "modifications": [
            {
              "description": "string",
              "reason": "string",
              "requested_by": "string",
              "approved_by": "string",
              "timestamp": "datetime"
            }
          ]
        },
        "quality": {
          "metrics": [
            {
              "name": "string",
              "value": "number",
              "target": "number",
              "variance": "number"
            }
          ],
          "inspections": [
            {
              "type": "string",
              "performed_at": "datetime",
              "performed_by": "string",
              "result": "string",
              "notes": "string"
            }
          ],
          "client_satisfaction": {
            "rating": "number",
            "comments": "string",
            "collected_at": "datetime"
          }
        },
        "outcome": {
          "result": "string",
          "deliverables": ["object"],
          "follow_up_required": "boolean",
          "follow_up_details": "object",
          "notes": "string"
        },
        "custom_fields": "object"
      }
    },
    "packages": {
      "package_id": {
        "name": "string",
        "description": "string",
        "services": [
          {
            "service_id": "string",
            "quantity": "number",
            "modifications": "object"
          }
        ],
        "pricing": {
          "total_price": "number",
          "discount": {
            "type": "string",
            "value": "number"
          },
          "validity": {
            "period": "number",
            "unit": "string",
            "start_type": "string"
          }
        },
        "active": "boolean",
        "created_at": "datetime",
        "updated_at": "datetime",
        "custom_fields": "object"
      }
    }
  },
  "SchedulingContext": {
    "appointments": {
      "appointment_id": {
        "basic_info": {
          "client_id": "string",
          "service_id": "string",
          "package_id": "string",
          "created_at": "datetime",
          "created_by": "string",
          "updated_at": "datetime",
          "updated_by": "string"
        },
        "timing": {
          "start_time": "datetime",
          "end_time": "datetime",
          "duration": "number",
          "buffer_before": "number",
          "buffer_after": "number",
          "timezone": "string"
        },
        "recurrence": {
          "is_recurring": "boolean",
          "pattern": "string",
          "interval": "number",
          "count": "number",
          "until": "datetime",
          "exceptions": ["datetime"]
        },
        "location": {
          "type": "string",
          "address": "object",
          "coordinates": {
            "latitude": "number",
            "longitude": "number"
          },
          "notes": "string"
        },
        "resources": {
          "assigned": [
            {
              "resource_id": "string",
              "type": "string",
              "role": "string",
              "status": "string"
            }
          ],
          "requirements": "object"
        },
        "status": {
          "current": "string",
          "history": [
            {
              "status": "string",
              "timestamp": "datetime",
              "updated_by": "string",
              "reason": "string"
            }
          ]
        },
        "reminders": [
          {
            "type": "string",
            "time": {
              "value": "number",
              "unit": "string",
              "before_appointment": "boolean"
            },
            "recipient": "string",
            "channel": "string",
            "status": "string",
            "sent_at": "datetime"
          }
        ],
        "notes": {
          "client": "string",
          "internal": "string",
          "special_instructions": "string"
        },
        "custom_fields": "object"
      }
    },
    "availability": {
      "resource_id": {
        "basic_info": {
          "type": "string",
          "name": "string",
          "capacity": "number",
          "created_at": "datetime",
          "updated_at": "datetime"
        },
        "regular_hours": [
          {
            "day_of_week": "string",
            "start_time": "string",
            "end_time": "string",
            "capacity": "number"
          }
        ],
        "exceptions": [
          {
            "date": "date",
            "available": "boolean",
            "start_time": "string",
            "end_time": "string",
            "capacity": "number",
            "reason": "string"
          }
        ],
        "unavailability": [
          {
            "start_datetime": "datetime",
            "end_datetime": "datetime",
            "reason": "string",
            "created_at": "datetime",
            "created_by": "string"
          }
        ],
        "booking_constraints": {
          "min_advance_time": {
            "value": "number",
            "unit": "string"
          },
          "max_advance_time": {
            "value": "number",
            "unit": "string"
          },
          "min_duration": "number",
          "max_duration": "number",
          "increment": "number"
        },
        "service_constraints": {
          "services_offered": ["string"],
          "service_durations": "object",
          "service_capacity": "object"
        },
        "location_constraints": {
          "service_area": "object",
          "travel_time": "object",
          "location_preferences": "object"
        },
        "custom_fields": "object"
      }
    },
    "calendar": {
      "calendar_id": {
        "name": "string",
        "description": "string",
        "resources": ["string"],
        "visibility": "string",
        "color": "string",
        "external_sync": {
          "provider": "string",
          "identifier": "string",
          "last_synced": "datetime",
          "sync_status": "string"
        },
        "created_at": "datetime",
        "updated_at": "datetime",
        "custom_fields": "object"
      }
    }
  },
  "FeedbackContext": {
    "responses": {
      "feedback_id": {
        "basic_info": {
          "client_id": "string",
          "service_id": "string",
          "delivery_id": "string",
          "timestamp": "datetime",
          "collection_method": "string",
          "created_at": "datetime",
          "updated_at": "datetime"
        },
        "ratings": {
          "overall": {
            "score": "number",
            "scale": "object",
            "weight": "number"
          },
          "categories": [
            {
              "name": "string",
              "score": "number",
              "scale": "object",
              "weight": "number"
            }
          ],
          "nps": {
            "score": "number",
            "category": "string"
          }
        },
        "feedback": {
          "comments": "string",
          "structured_responses": "object",
          "attachments": ["object"]
        },
        "analysis": {
          "sentiment": {
            "score": "number",
            "confidence": "number",
            "aspects": "object"
          },
          "topics": ["string"],
          "entities": ["object"],
          "keywords": ["string"]
        },
        "follow_up": {
          "required": "boolean",
          "priority": "string",
          "assigned_to": "string",
          "status": "string",
          "resolution": "string",
          "resolved_at": "datetime",
          "resolved_by": "string"
        },
        "response": {
          "sent": "boolean",
          "channel": "string",
          "content": "string",
          "sent_at": "datetime",
          "sent_by": "string"
        },
        "custom_fields": "object"
      }
    },
    "campaigns": {
      "campaign_id": {
        "name": "string",
        "description": "string",
        "type": "string",
        "target": {
          "client_segments": ["string"],
          "service_types": ["string"],
          "time_frame": "object"
        },
        "content": {
          "questions": [
            {
              "text": "string",
              "type": "string",
              "options": ["string"],
              "required": "boolean"
            }
          ],
          "introduction": "string",
          "conclusion": "string"
        },
        "delivery": {
          "channel": "string",
          "timing": {
            "trigger": "string",
            "delay": {
              "value": "number",
              "unit": "string"
            }
          },
          "reminders": [
            {
              "delay": {
                "value": "number",
                "unit": "string"
              },
              "max_count": "number"
            }
          ]
        },
        "status": {
          "active": "boolean",
          "start_date": "datetime",
          "end_date": "datetime"
        },
        "metrics": {
          "sent_count": "number",
          "response_count": "number",
          "response_rate": "number",
          "average_rating": "number"
        },
        "created_at": "datetime",
        "updated_at": "datetime",
        "custom_fields": "object"
      }
    },
    "aggregates": {
      "service_id": {
        "ratings": {
          "overall": {
            "average": "number",
            "median": "number",
            "distribution": "object",
            "trend": "object"
          },
          "categories": [
            {
              "name": "string",
              "average": "number",
              "median": "number",
              "distribution": "object",
              "trend": "object"
            }
          ],
          "nps": {
            "score": "number",
            "promoters": "number",
            "passives": "number",
            "detractors": "number",
            "trend": "object"
          }
        },
        "sentiment": {
          "average": "number",
          "trend": "object",
          "aspects": "object"
        },
        "topics": {
          "frequent": ["string"],
          "positive": ["string"],
          "negative": ["string"],
          "trending": ["string"]
        },
        "response_metrics": {
          "count": "number",
          "rate": "number",
          "time_distribution": "object"
        },
        "last_updated": "datetime",
        "custom_fields": "object"
      },
      "client_segment": {
        "segment_id": "string",
        "ratings": "object",
        "sentiment": "object",
        "topics": "object",
        "response_metrics": "object",
        "last_updated": "datetime"
      },
      "time_period": {
        "period": "string",
        "ratings": "object",
        "sentiment": "object",
        "topics": "object",
        "response_metrics": "object",
        "last_updated": "datetime"
      }
    }
  },
  "FinancialContext": {
    "invoices": {
      "invoice_id": {
        "basic_info": {
          "client_id": "string",
          "number": "string",
          "reference": "string",
          "created_at": "datetime",
          "created_by": "string",
          "updated_at": "datetime",
          "updated_by": "string"
        },
        "items": [
          {
            "type": "string",
            "description": "string",
            "quantity": "number",
            "unit_price": "number",
            "discount": {
              "type": "string",
              "value": "number"
            },
            "tax": {
              "rate": "number",
              "amount": "number"
            },
            "total": "number",
            "service_id": "string",
            "delivery_id": "string",
            "custom_fields": "object"
          }
        ],
        "summary": {
          "subtotal": "number",
          "discount_total": "number",
          "tax_total": "number",
          "total": "number",
          "amount_paid": "number",
          "balance": "number",
          "currency": "string"
        },
        "dates": {
          "issue_date": "date",
          "due_date": "date",
          "service_period": {
            "start_date": "date",
            "end_date": "date"
          }
        },
        "status": {
          "current": "string",
          "history": [
            {
              "status": "string",
              "timestamp": "datetime",
              "updated_by": "string",
              "reason": "string"
            }
          ]
        },
        "delivery": {
          "method": "string",
          "recipient": "string",
          "sent_at": "datetime",
          "delivery_status": "string"
        },
        "payment_terms": {
          "terms": "string",
          "days": "number",
          "instructions": "string",
          "accepted_methods": ["string"]
        },
        "notes": {
          "client_message": "string",
          "internal_notes": "string",
          "terms_and_conditions": "string"
        },
        "custom_fields": "object"
      }
    },
    "payments": {
      "payment_id": {
        "basic_info": {
          "client_id": "string",
          "invoice_id": "string",
          "transaction_id": "string",
          "created_at": "datetime",
          "created_by": "string"
        },
        "details": {
          "amount": "number",
          "currency": "string",
          "method": "string",
          "reference": "string",
          "description": "string"
        },
        "status": {
          "current": "string",
          "history": [
            {
              "status": "string",
              "timestamp": "datetime",
              "updated_by": "string",
              "reason": "string"
            }
          ]
        },
        "processing": {
          "processor": "string",
          "fee": "number",
          "authorization_code": "string",
          "processed_at": "datetime"
        },
        "allocation": [
          {
            "invoice_id": "string",
            "amount": "number"
          }
        ],
        "notes": "string",
        "custom_fields": "object"
      }
    },
    "subscriptions": {
      "subscription_id": {
        "basic_info": {
          "client_id": "string",
          "name": "string",
          "description": "string",
          "created_at": "datetime",
          "created_by": "string",
          "updated_at": "datetime",
          "updated_by": "string"
        },
        "plan": {
          "service_id": "string",
          "package_id": "string",
          "quantity": "number",
          "price": "number",
          "currency": "string",
          "billing_cycle": {
            "interval": "string",
            "period": "number"
          },
          "trial": {
            "enabled": "boolean",
            "duration": {
              "value": "number",
              "unit": "string"
            },
            "end_date": "date"
          }
        },
        "status": {
          "current": "string",
          "history": [
            {
              "status": "string",
              "timestamp": "datetime",
              "updated_by": "string",
              "reason": "string"
            }
          ]
        },
        "billing": {
          "start_date": "date",
          "next_billing_date": "date",
          "last_billing_date": "date",
          "end_date": "date",
          "payment_method": "string",
          "auto_renew": "boolean"
        },
        "usage": {
          "included_units": "number",
          "used_units": "number",
          "remaining_units": "number",
          "overage_rate": "number",
          "reset_date": "date"
        },
        "history": {
          "invoices": ["string"],
          "payments": ["string"],
          "changes": [
            {
              "field": "string",
              "old_value": "any",
              "new_value": "any",
              "timestamp": "datetime",
              "changed_by": "string",
              "reason": "string"
            }
          ]
        },
        "custom_fields": "object"
      }
    },
    "pricing": {
      "price_list_id": {
        "name": "string",
        "description": "string",
        "effective_date": "date",
        "expiration_date": "date",
        "currency": "string",
        "target": {
          "client_segments": ["string"],
          "regions": ["string"]
        },
        "items": [
          {
            "service_id": "string",
            "price": "number",
            "unit": "string",
            "minimum": "number",
            "maximum": "number",
            "custom_fields": "object"
          }
        ],
        "discounts": [
          {
            "name": "string",
            "type": "string",
            "value": "number",
            "conditions": "object",
            "stackable": "boolean",
            "priority": "number"
          }
        ],
        "taxes": [
          {
            "name": "string",
            "rate": "number",
            "applies_to": ["string"],
            "region": "string"
          }
        ],
        "active": "boolean",
        "created_at": "datetime",
        "updated_at": "datetime",
        "custom_fields": "object"
      }
    }
  },
  "AnalyticsContext": {
    "metrics": {
      "metric_id": {
        "basic_info": {
          "name": "string",
          "description": "string",
          "category": "string",
          "unit": "string",
          "created_at": "datetime",
          "updated_at": "datetime"
        },
        "current": {
          "value": "number",
          "timestamp": "datetime",
          "calculated_by": "string"
        },
        "historical": [
          {
            "value": "number",
            "timestamp": "datetime",
            "calculated_by": "string"
          }
        ],
        "targets": {
          "current": {
            "value": "number",
            "type": "string"
          },
          "historical": [
            {
              "value": "number",
              "type": "string",
              "from": "datetime",
              "to": "datetime"
            }
          ]
        },
        "comparison": {
          "previous_period": {
            "value": "number",
            "change": "number",
            "change_percent": "number"
          },
          "year_over_year": {
            "value": "number",
            "change": "number",
            "change_percent": "number"
          },
          "benchmark": {
            "value": "number",
            "source": "string",
            "difference": "number",
            "difference_percent": "number"
          }
        },
        "visualization": {
          "preferred_chart": "string",
          "color": "string",
          "thresholds": {
            "warning": "number",
            "critical": "number"
          }
        },
        "calculation": {
          "formula": "string",
          "dependencies": ["string"],
          "frequency": "string",
          "last_calculated": "datetime"
        },
        "custom_fields": "object"
      }
    },
    "insights": {
      "insight_id": {
        "basic_info": {
          "type": "string",
          "title": "string",
          "description": "string",
          "generated_at": "datetime",
          "generated_by": "string",
          "expires_at": "datetime"
        },
        "content": {
          "summary": "string",
          "details": "string",
          "supporting_data": "object",
          "visualizations": ["string"]
        },
        "relevance": {
          "business_impact": "string",
          "urgency": "string",
          "confidence": "number",
          "audience": ["string"]
        },
        "related": {
          "metrics": ["string"],
          "insights": ["string"],
          "entities": [
            {
              "type": "string",
              "id": "string"
            }
          ]
        },
        "actions": [
          {
            "description": "string",
            "priority": "string",
            "assigned_to": "string",
            "due_date": "date",
            "status": "string"
          }
        ],
        "feedback": {
          "useful": "boolean",
          "implemented": "boolean",
          "comments": "string",
          "provided_by": "string",
          "provided_at": "datetime"
        },
        "custom_fields": "object"
      }
    },
    "dashboards": {
      "dashboard_id": {
        "name": "string",
        "description": "string",
        "layout": "object",
        "widgets": [
          {
            "id": "string",
            "type": "string",
            "title": "string",
            "data_source": "object",
            "visualization": "object",
            "position": "object"
          }
        ],
        "filters": {
          "global": "object",
          "widget_specific": "object"
        },
        "access": {
          "roles": ["string"],
          "users": ["string"],
          "public": "boolean"
        },
        "refresh": {
          "automatic": "boolean",
          "interval": "number",
          "last_refreshed": "datetime"
        },
        "created_at": "datetime",
        "updated_at": "datetime",
        "custom_fields": "object"
      }
    },
    "reports": {
      "report_id": {
        "name": "string",
        "description": "string",
        "type": "string",
        "content": {
          "sections": [
            {
              "title": "string",
              "content": "string",
              "metrics": ["string"],
              "visualizations": ["string"]
            }
          ],
          "summary": "string",
          "recommendations": ["string"]
        },
        "schedule": {
          "frequency": "string",
          "day": "string",
          "time": "string",
          "recipients": ["string"],
          "delivery_method": "string",
          "last_sent": "datetime",
          "next_scheduled": "datetime"
        },
        "parameters": {
          "date_range": "object",
          "filters": "object",
          "comparisons": "object"
        },
        "created_at": "datetime",
        "updated_at": "datetime",
        "custom_fields": "object"
      }
    }
  },
  "AgentContext": {
    "states": {
      "agent_id": {
        "basic_info": {
          "type": "string",
          "version": "string",
          "created_at": "datetime",
          "updated_at": "datetime"
        },
        "status": {
          "current": "string",
          "since": "datetime",
          "history": [
            {
              "status": "string",
              "from": "datetime",
              "to": "datetime",
              "reason": "string"
            }
          ]
        },
        "tasks": {
          "current": [
            {
              "id": "string",
              "type": "string",
              "priority": "string",
              "status": "string",
              "started_at": "datetime",
              "estimated_completion": "datetime"
            }
          ],
          "queued": [
            {
              "id": "string",
              "type": "string",
              "priority": "string",
              "queued_at": "datetime"
            }
          ],
          "completed": [
            {
              "id": "string",
              "type": "string",
              "priority": "string",
              "completed_at": "datetime",
              "outcome": "string"
            }
          ]
        },
        "performance": {
          "metrics": {
            "tasks_completed": "number",
            "average_completion_time": "number",
            "success_rate": "number",
            "error_rate": "number"
          },
          "resource_usage": {
            "cpu": "number",
            "memory": "number",
            "storage": "number",
            "api_calls": "number"
          },
          "quality": {
            "accuracy": "number",
            "precision": "number",
            "recall": "number",
            "f1_score": "number"
          }
        },
        "learning": {
          "model_version": "string",
          "training_iterations": "number",
          "last_trained": "datetime",
          "performance_improvement": "number",
          "learning_rate": "number"
        },
        "configuration": {
          "settings": "object",
          "permissions": "object",
          "integrations": "object",
          "custom_configuration": "object"
        },
        "custom_fields": "object"
      }
    },
    "logs": {
      "log_id": {
        "agent_id": "string",
        "timestamp": "datetime",
        "level": "string",
        "category": "string",
        "action": "string",
        "context_accessed": [
          {
            "context": "string",
            "operation": "string",
            "path": "string"
          }
        ],
        "details": {
          "input": "object",
          "output": "object",
          "processing_time": "number",
          "decision_factors": "object"
        },
        "result": {
          "status": "string",
          "code": "string",
          "message": "string"
        },
        "error": {
          "type": "string",
          "message": "string",
          "stack": "string",
          "handled": "boolean"
        },
        "related": {
          "task_id": "string",
          "client_id": "string",
          "service_id": "string",
          "entity_ids": ["string"]
        },
        "custom_fields": "object"
      }
    },
    "workflows": {
      "workflow_id": {
        "name": "string",
        "description": "string",
        "version": "string",
        "trigger": {
          "type": "string",
          "configuration": "object"
        },
        "steps": [
          {
            "id": "string",
            "type": "string",
            "agent": "string",
            "action": "string",
            "parameters": "object",
            "conditions": "object",
            "next_steps": "object",
            "error_handling": "object"
          }
        ],
        "status": {
          "active": "boolean",
          "last_executed": "datetime",
          "execution_count": "number",
          "success_rate": "number",
          "average_duration": "number"
        },
        "created_at": "datetime",
        "updated_at": "datetime",
        "custom_fields": "object"
      }
    },
    "decisions": {
      "decision_id": {
        "agent_id": "string",
        "timestamp": "datetime",
        "type": "string",
        "context": {
          "client_id": "string",
          "service_id": "string",
          "related_entities": ["object"]
        },
        "inputs": [
          {
            "name": "string",
            "value": "any",
            "weight": "number",
            "source": "string"
          }
        ],
        "reasoning": {
          "rules_applied": ["string"],
          "factors_considered": ["object"],
          "alternatives": ["object"],
          "confidence": "number"
        },
        "outcome": {
          "decision": "string",
          "explanation": "string",
          "next_actions": ["string"]
        },
        "feedback": {
          "correct": "boolean",
          "override": "string",
          "comments": "string",
          "provided_by": "string",
          "provided_at": "datetime"
        },
        "custom_fields": "object"
      }
    }
  },
  "SystemContext": {
    "configuration": {
      "business_info": {
        "name": "string",
        "legal_name": "string",
        "tax_id": "string",
        "industry": "string",
        "contact": {
          "email": "string",
          "phone": "string",
          "address": "object",
          "website": "string"
        },
        "branding": {
          "logo_url": "string",
          "colors": "object",
          "email_signature": "string"
        },
        "custom_fields": "object"
      },
      "operating_hours": {
        "timezone": "string",
        "regular_hours": [
          {
            "day_of_week": "string",
            "open": "string",
            "close": "string",
            "closed": "boolean"
          }
        ],
        "holidays": [
          {
            "date": "date",
            "name": "string",
            "closed": "boolean",
            "hours": "object"
          }
        ],
        "special_hours": [
          {
            "date": "date",
            "reason": "string",
            "hours": "object"
          }
        ],
        "custom_fields": "object"
      },
      "notification_settings": {
        "channels": {
          "email": {
            "enabled": "boolean",
            "provider": "string",
            "from_address": "string",
            "reply_to": "string",
            "templates": "object"
          },
          "sms": {
            "enabled": "boolean",
            "provider": "string",
            "from_number": "string",
            "templates": "object"
          },
          "push": {
            "enabled": "boolean",
            "provider": "string",
            "templates": "object"
          },
          "custom_channels": "object"
        },
        "events": {
          "appointment": {
            "confirmation": {
              "enabled": "boolean",
              "timing": "object",
              "channels": ["string"],
              "template": "string"
            },
            "reminder": {
              "enabled": "boolean",
              "timing": "object",
              "channels": ["string"],
              "template": "string"
            },
            "cancellation": {
              "enabled": "boolean",
              "timing": "object",
              "channels": ["string"],
              "template": "string"
            },
            "rescheduling": {
              "enabled": "boolean",
              "timing": "object",
              "channels": ["string"],
              "template": "string"
            }
          },
          "service": {
            "completion": {
              "enabled": "boolean",
              "timing": "object",
              "channels": ["string"],
              "template": "string"
            },
            "feedback_request": {
              "enabled": "boolean",
              "timing": "object",
              "channels": ["string"],
              "template": "string"
            }
          },
          "billing": {
            "invoice": {
              "enabled": "boolean",
              "timing": "object",
              "channels": ["string"],
              "template": "string"
            },
            "payment_confirmation": {
              "enabled": "boolean",
              "timing": "object",
              "channels": ["string"],
              "template": "string"
            },
            "payment_reminder": {
              "enabled": "boolean",
              "timing": "object",
              "channels": ["string"],
              "template": "string"
            }
          },
          "custom_events": "object"
        },
        "preferences": {
          "quiet_hours": {
            "enabled": "boolean",
            "start_time": "string",
            "end_time": "string",
            "exceptions": ["string"]
          },
          "frequency_limits": {
            "max_per_day": "number",
            "min_interval": "number",
            "exceptions": ["string"]
          },
          "priority_rules": "object",
          "custom_preferences": "object"
        },
        "custom_fields": "object"
      },
      "integration_settings": {
        "payment_processors": [
          {
            "name": "string",
            "provider": "string",
            "enabled": "boolean",
            "default": "boolean",
            "configuration": "object",
            "custom_fields": "object"
          }
        ],
        "calendar_systems": [
          {
            "name": "string",
            "provider": "string",
            "enabled": "boolean",
            "default": "boolean",
            "configuration": "object",
            "custom_fields": "object"
          }
        ],
        "communication_systems": [
          {
            "name": "string",
            "provider": "string",
            "type": "string",
            "enabled": "boolean",
            "default": "boolean",
            "configuration": "object",
            "custom_fields": "object"
          }
        ],
        "external_services": [
          {
            "name": "string",
            "provider": "string",
            "type": "string",
            "enabled": "boolean",
            "configuration": "object",
            "custom_fields": "object"
          }
        ],
        "custom_integrations": "object"
      },
      "security_settings": {
        "authentication": {
          "methods": ["string"],
          "password_policy": "object",
          "mfa_required": "boolean",
          "session_timeout": "number"
        },
        "authorization": {
          "roles": [
            {
              "name": "string",
              "permissions": ["string"],
              "description": "string"
            }
          ],
          "access_controls": "object"
        },
        "data_protection": {
          "encryption": {
            "at_rest": "boolean",
            "in_transit": "boolean",
            "key_management": "object"
          },
          "retention_policy": "object",
          "anonymization_rules": "object"
        },
        "compliance": {
          "frameworks": ["string"],
          "requirements": "object",
          "documentation": "object"
        },
        "custom_fields": "object"
      },
      "custom_fields": "object"
    },
    "status": {
      "system": {
        "status": "string",
        "uptime": "number",
        "last_restart": "datetime",
        "version": "string",
        "environment": "string"
      },
      "components": [
        {
          "name": "string",
          "type": "string",
          "status": "string",
          "last_check": "datetime",
          "metrics": "object"
        }
      ],
      "resources": {
        "cpu": {
          "usage": "number",
          "available": "number"
        },
        "memory": {
          "usage": "number",
          "available": "number"
        },
        "storage": {
          "usage": "number",
          "available": "number"
        },
        "network": {
          "bandwidth": "number",
          "latency": "number"
        }
      },
      "maintenance": {
        "last_backup": "datetime",
        "next_scheduled": "datetime",
        "pending_updates": "number"
      },
      "activity": {
        "active_users": "number",
        "active_sessions": "number",
        "requests_per_minute": "number",
        "error_rate": "number"
      },
      "alerts": [
        {
          "id": "string",
          "severity": "string",
          "message": "string",
          "timestamp": "datetime",
          "acknowledged": "boolean"
        }
      ],
      "custom_fields": "object"
    },
    "audit": {
      "log_id": {
        "timestamp": "datetime",
        "user": "string",
        "action": "string",
        "entity_type": "string",
        "entity_id": "string",
        "changes": "object",
        "ip_address": "string",
        "user_agent": "string",
        "result": "string",
        "custom_fields": "object"
      }
    }
  }
}
```

## Context Schema Relationships

### Primary Relationships

1. **Client to Service Delivery**
   - ClientContext.profiles[client_id] → ServiceContext.delivery[delivery_id].basic_info.client_id
   - Tracks which services have been delivered to which clients

2. **Client to Appointment**
   - ClientContext.profiles[client_id] → SchedulingContext.appointments[appointment_id].basic_info.client_id
   - Connects clients to their scheduled appointments

3. **Client to Feedback**
   - ClientContext.profiles[client_id] → FeedbackContext.responses[feedback_id].basic_info.client_id
   - Links clients to their provided feedback

4. **Client to Invoice**
   - ClientContext.profiles[client_id] → FinancialContext.invoices[invoice_id].basic_info.client_id
   - Associates clients with their financial transactions

5. **Service to Appointment**
   - ServiceContext.catalog[service_id] → SchedulingContext.appointments[appointment_id].basic_info.service_id
   - Defines which service is being scheduled

6. **Appointment to Service Delivery**
   - SchedulingContext.appointments[appointment_id] → ServiceContext.delivery[delivery_id].basic_info.appointment_id
   - Links scheduled appointments to their service delivery

7. **Service Delivery to Feedback**
   - ServiceContext.delivery[delivery_id] → FeedbackContext.responses[feedback_id].basic_info.delivery_id
   - Connects service delivery to client feedback

8. **Invoice to Payment**
   - FinancialContext.invoices[invoice_id] → FinancialContext.payments[payment_id].basic_info.invoice_id
   - Links invoices to their payment records

### Secondary Relationships

1. **Client Interaction to Service**
   - ClientContext.interactions[interaction_id].related.related_services → ServiceContext.catalog[service_id]
   - Tracks which services are discussed in client interactions

2. **Resource to Appointment**
   - SchedulingContext.availability[resource_id] → SchedulingContext.appointments[appointment_id].resources.assigned[].resource_id
   - Manages which resources are assigned to appointments

3. **Agent to Workflow**
   - AgentContext.states[agent_id] → AgentContext.workflows[workflow_id].steps[].agent
   - Defines which agents participate in workflows

4. **Metric to Insight**
   - AnalyticsContext.metrics[metric_id] → AnalyticsContext.insights[insight_id].related.metrics
   - Connects metrics to the insights they generate

5. **Client to Household**
   - ClientContext.profiles[client_id] → ClientContext.households[household_id].members[].client_id
   - Groups clients into household units

## Context Access Patterns

### ClientContextAgent

**Read Access**:
- ClientContext.profiles[client_id].*
- ClientContext.interactions[interaction_id].*
- ClientContext.households[household_id].*
- ServiceContext.delivery[delivery_id].{basic_info, status, outcome}
- FeedbackContext.responses[feedback_id].{basic_info, ratings, feedback}
- FinancialContext.invoices[invoice_id].{basic_info, status}

**Write Access**:
- ClientContext.profiles[client_id].*
- ClientContext.interactions[interaction_id].*
- ClientContext.households[household_id].*

### SchedulerAgent

**Read Access**:
- SchedulingContext.appointments[appointment_id].*
- SchedulingContext.availability[resource_id].*
- SchedulingContext.calendar[calendar_id].*
- ClientContext.profiles[client_id].{basic_info, preferences.scheduling}
- ServiceContext.catalog[service_id].{basic_info, delivery, resources}
- SystemContext.configuration.{operating_hours, notification_settings}

**Write Access**:
- SchedulingContext.appointments[appointment_id].*
- SchedulingContext.availability[resource_id].{unavailability, exceptions}
- SchedulingContext.calendar[calendar_id].{external_sync}

### ServiceDeliveryAgent

**Read Access**:
- ServiceContext.catalog[service_id].*
- ServiceContext.delivery[delivery_id].*
- ServiceContext.packages[package_id].*
- SchedulingContext.appointments[appointment_id].*
- ClientContext.profiles[client_id].{basic_info, preferences.service}
- SchedulingContext.availability[resource_id].{basic_info, service_constraints}

**Write Access**:
- ServiceContext.delivery[delivery_id].*

### FeedbackAgent

**Read Access**:
- FeedbackContext.responses[feedback_id].*
- FeedbackContext.campaigns[campaign_id].*
- FeedbackContext.aggregates.*
- ClientContext.profiles[client_id].{basic_info, preferences.communication}
- ServiceContext.delivery[delivery_id].{basic_info, quality, outcome}
- SystemContext.configuration.notification_settings

**Write Access**:
- FeedbackContext.responses[feedback_id].*
- FeedbackContext.campaigns[campaign_id].*
- FeedbackContext.aggregates.*

### BillingAgent

**Read Access**:
- FinancialContext.invoices[invoice_id].*
- FinancialContext.payments[payment_id].*
- FinancialContext.subscriptions[subscription_id].*
- FinancialContext.pricing[price_list_id].*
- ClientContext.profiles[client_id].{basic_info, preferences.payment}
- ServiceContext.delivery[delivery_id].{basic_info, status}
- ServiceContext.catalog[service_id].pricing
- SystemContext.configuration.{business_info, notification_settings, integration_settings.payment_processors}

**Write Access**:
- FinancialContext.invoices[invoice_id].*
- FinancialContext.payments[payment_id].*
- FinancialContext.subscriptions[subscription_id].*

### RetentionAgent

**Read Access**:
- ClientContext.profiles[client_id].*
- ClientContext.interactions[interaction_id].*
- ServiceContext.delivery[delivery_id].{basic_info, quality, outcome}
- FeedbackContext.responses[feedback_id].*
- FinancialContext.invoices[invoice_id].{basic_info, status}
- FinancialContext.subscriptions[subscription_id].*
- AnalyticsContext.metrics[metric_id].{basic_info, current, historical}

**Write Access**:
- ClientContext.profiles[client_id].relationship.*
- ClientContext.profiles[client_id].segments.*
- ClientContext.interactions[interaction_id].*

### AnalyticsAgent

**Read Access**:
- All contexts (read-only)

**Write Access**:
- AnalyticsContext.metrics[metric_id].*
- AnalyticsContext.insights[insight_id].*
- AnalyticsContext.dashboards[dashboard_id].*
- AnalyticsContext.reports[report_id].*

## Context Implementation Guidelines

### Storage Strategy

1. **Primary Storage**:
   - Use Directual as the primary context storage system
   - Implement the schema using Directual's database builder
   - Create API endpoints for agent access to context

2. **Performance Optimization**:
   - Use Aitable for frequently accessed structured data
   - Implement caching for high-volume read operations
   - Use NoCodeBackEnd for large-scale data storage

3. **Synchronization**:
   - Maintain bi-directional sync between Directual and Aitable
   - Implement conflict resolution mechanisms
   - Use KonnectzIT for orchestrating data synchronization

### Access Control

1. **Authentication**:
   - Implement API key authentication for agent access
   - Use OAuth2 for user-facing applications
   - Manage credentials securely in SystemContext

2. **Authorization**:
   - Define role-based access control in SystemContext
   - Implement context-level access restrictions
   - Log all access attempts in SystemContext.audit

3. **Data Protection**:
   - Encrypt sensitive data at rest
   - Implement field-level encryption for PII
   - Apply data anonymization for analytics

### Versioning and History

1. **Change Tracking**:
   - Record all context updates with metadata
   - Maintain history of status changes
   - Implement audit logging for all write operations

2. **Temporal Access**:
   - Support point-in-time context retrieval
   - Implement context snapshots for critical operations
   - Maintain historical metrics for trend analysis

3. **Conflict Resolution**:
   - Implement optimistic concurrency control
   - Define conflict resolution strategies
   - Use transaction logs for recovery

## Industry-Specific Schema Extensions

### Healthcare Services

```json
{
  "ClientContext": {
    "profiles": {
      "client_id": {
        "healthcare": {
          "medical_record_number": "string",
          "insurance": {
            "provider": "string",
            "policy_number": "string",
            "group_number": "string",
            "coverage": "object"
          },
          "health_information": {
            "allergies": ["string"],
            "conditions": ["string"],
            "medications": ["string"],
            "last_updated": "datetime"
          },
          "hipaa_consent": {
            "status": "boolean",
            "signed_date": "date",
            "expires": "date",
            "document_reference": "string"
          }
        }
      }
    }
  },
  "ServiceContext": {
    "catalog": {
      "service_id": {
        "healthcare": {
          "treatment_type": "string",
          "diagnosis_codes": ["string"],
          "procedure_codes": ["string"],
          "provider_requirements": {
            "specialties": ["string"],
            "certifications": ["string"],
            "licenses": ["string"]
          },
          "medical_necessity": {
            "required": "boolean",
            "documentation": "string"
          }
        }
      }
    }
  }
}
```

### Home Services

```json
{
  "ClientContext": {
    "profiles": {
      "client_id": {
        "properties": [
          {
            "property_id": "string",
            "address": "object",
            "type": "string",
            "size": "number",
            "year_built": "number",
            "access_instructions": "string",
            "pets": "object",
            "systems": {
              "hvac": "object",
              "plumbing": "object",
              "electrical": "object",
              "custom": "object"
            },
            "service_history": ["string"]
          }
        ]
      }
    }
  },
  "ServiceContext": {
    "delivery": {
      "delivery_id": {
        "home_service": {
          "property_id": "string",
          "areas_serviced": ["string"],
          "before_photos": ["string"],
          "after_photos": ["string"],
          "materials_used": [
            {
              "name": "string",
              "quantity": "number",
              "unit": "string"
            }
          ],
          "warranty": {
            "offered": "boolean",
            "term": "string",
            "details": "string",
            "expires": "date"
          }
        }
      }
    }
  }
}
```

### Professional Services

```json
{
  "ClientContext": {
    "profiles": {
      "client_id": {
        "professional": {
          "organization": "string",
          "department": "string",
          "role": "string",
          "industry": "string",
          "annual_revenue": "number",
          "employee_count": "number",
          "decision_makers": [
            {
              "name": "string",
              "role": "string",
              "contact": "object"
            }
          ],
          "documents": [
            {
              "type": "string",
              "name": "string",
              "url": "string",
              "date": "date"
            }
          ]
        }
      }
    }
  },
  "ServiceContext": {
    "delivery": {
      "delivery_id": {
        "project": {
          "name": "string",
          "description": "string",
          "objectives": ["string"],
          "methodology": "string",
          "phases": [
            {
              "name": "string",
              "status": "string",
              "start_date": "date",
              "end_date": "date",
              "deliverables": ["string"]
            }
          ],
          "stakeholders": [
            {
              "name": "string",
              "role": "string",
              "involvement": "string"
            }
          ],
          "documents": [
            {
              "type": "string",
              "name": "string",
              "url": "string",
              "version": "string",
              "date": "date"
            }
          ]
        }
      }
    }
  }
}
```

## Next Steps for Implementation

1. **Create Base Schema**:
   - Implement core context structure in Directual
   - Set up basic relationships between contexts
   - Create API endpoints for context access

2. **Implement Agent Access Patterns**:
   - Define read/write permissions for each agent
   - Create agent-specific API endpoints
   - Implement context validation rules

3. **Set Up Synchronization**:
   - Configure bi-directional sync between Directual and Aitable
   - Implement conflict resolution mechanisms
   - Set up change tracking and history

4. **Add Industry-Specific Extensions**:
   - Identify relevant industry extensions
   - Implement custom fields and relationships
   - Create industry-specific validation rules

5. **Test and Optimize**:
   - Validate schema with sample data
   - Test agent access patterns
   - Optimize for performance and scalability
